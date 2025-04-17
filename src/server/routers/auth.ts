import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateRandomSixDigitNumber } from "@/lib/utils";
import argon2 from "argon2";
import { z } from "zod";

import ResetPasswordTokenTemplate from "../../../emails/ResetPasswordTokenTemplate";
import VerifyTokenTemplateEmail from "../../../emails/VerifyTokenTemplate";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const user = await prisma.user.findFirst({
        where: {
          email: opts.input.email,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }

      const loginSuccess = await argon2.verify(
        user.password,
        opts.input.password,
      );
      if (!loginSuccess) {
        throw new Error("Invalid password.");
      }

      const session = await prisma.session.create({
        data: {
          userId: user.id,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      const extendedUser = { ...user, Session: session };

      return extendedUser;
    }),
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const hash = await argon2.hash(opts.input.password);
      try {
        const user = await prisma.user.create({
          data: {
            name: opts.input.name,
            email: opts.input.email,
            password: hash,
            verificationToken: generateRandomSixDigitNumber(),
          },
        });

        const session = await prisma.session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        await resend.emails.send({
          from: "Niklas <clubverse@niklas.sh>",
          to: user.email,
          subject: "Verify your account",
          react: VerifyTokenTemplateEmail({ token: user.verificationToken }),
        });

        const extendedUser = { ...user, Session: session };

        return extendedUser;
      } catch (error) {
        console.error("SIGNUP ERROR: ", error);
        throw new Error("Something went wrong.");
      }
    }),
  loginWithToken: publicProcedure.input(z.string()).mutation(async (opts) => {
    const session = await prisma.session.findFirst({
      where: {
        token: opts.input,
        valid: true,
      },
    });
    if (!session) {
      throw new Error("Session not found.");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.userId,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const extendedUser = { ...user, Session: session };

    return extendedUser;
  }),
  invalidateSession: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const session = await prisma.session.update({
        where: {
          token: opts.input,
        },
        data: {
          valid: false,
        },
      });

      return session;
    }),
  verifyEmail: publicProcedure
    .input(z.object({ email: z.string(), token: z.number() }))
    .mutation(async (opts) => {
      const user = await prisma.user.findFirst({
        where: {
          email: opts.input.email,
          verificationToken: opts.input.token,
        },
      });
      if (!user) {
        throw new Error("Invalid verification token.");
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          verified: true,
        },
      });

      return user;
    }),

  createResetPasswordToken: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const user = await prisma.user.findFirst({
        where: {
          email: opts.input,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }

      const { passwordResetToken } = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordResetToken: generateRandomSixDigitNumber(),
        },
      });

      await resend.emails.send({
        from: "Niklas <clubverse@niklas.sh>",
        to: user.email,
        subject: "Reset password token",
        react: ResetPasswordTokenTemplate({ token: passwordResetToken }),
      });

      return user;
    }),

  verifyResetPasswordToken: publicProcedure
    .input(z.object({ email: z.string(), token: z.number() }))
    .mutation(async (opts) => {
      const user = await prisma.user.findFirst({
        where: {
          email: opts.input.email,
          passwordResetToken: opts.input.token,
        },
      });
      if (!user) {
        throw new Error("Invalid reset password token.");
      }

      return null;
    }),
  updatePassword: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const hash = await argon2.hash(opts.input.password);
      const user = await prisma.user.update({
        where: {
          email: opts.input.email,
        },
        data: {
          password: hash,
          passwordResetToken: 0,
        },
      });

      return user;
    }),
  changePassword: publicProcedure
    .input(
      z.object({
        email: z.string().nullable(),
        currentPassword: z.string(),
        newPassword: z.string(),
      }),
    )
    .mutation(async (opts) => {
      if (!opts.input.email) {
        throw new Error("Email is required.");
      }

      const user = await prisma.user.findFirst({
        where: {
          email: opts.input.email,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }

      const loginSuccess = await argon2.verify(
        user.password,
        opts.input.currentPassword,
      );
      if (!loginSuccess) {
        throw new Error("Invalid password");
      }

      const hash = await argon2.hash(opts.input.newPassword);
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hash,
        },
      });

      return updatedUser;
    }),
  updateProfile: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        avatarUrl: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const user = await prisma.user.findFirst({
        where: {
          id: opts.input.id,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: opts.input.name,
          avatarUrl: opts.input.avatarUrl,
        },
      });

      return updatedUser;
    }),
});
