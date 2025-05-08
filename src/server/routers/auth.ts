import { JSX } from "react";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateRandomSixDigitNumber } from "@/lib/utils";
import argon2 from "argon2";
import { z } from "zod";

import ResetPasswordTemplate from "../../../emails/reset-password-template";
import VerifyTokenTemplate from "../../../emails/verify-token-template";
import { publicProcedure, router } from "../trpc";

/**
 * Authentication Router Endpoints:
 *
 * * login: Authenticate with email and password, returns user and session.
 * * signUp: Register a new user, hash password, send verification token email, returns user and session.
 * * loginWithToken: Authenticate using session token, returns user and session.
 * * invalidateSession: Invalidate a session token.
 * * verifyEmail: Verify user's email using a verification token.
 * * resendVerificationToken: Resend email verification token to user.
 * * createResetPasswordToken: Generate and email a password reset token.
 * * verifyResetPasswordToken: Verify the validity of a password reset token.
 * * updatePassword: Update the user's password and clear the reset token.
 */

const ERRORS = {
  NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid credentials.",
  ALREADY_VERIFIED: "Email already verified.",
  GENERIC: "Something went wrong.",
};

async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(ERRORS.NOT_FOUND);
  return user;
}

async function createSessionFor(userId: string) {
  return prisma.session.create({
    data: {
      userId,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
}

async function sendTokenEmail(
  email: string,
  subject: string,
  template: (opts: { token: number }) => JSX.Element,
  token: number,
) {
  await resend.emails.send({
    from: "Niklas <clubverse@niklas.sh>",
    to: email,
    subject,
    react: template({ token }),
  });
}

async function generateAndStoreToken(
  userId: string,
  field: "verificationToken" | "passwordResetToken",
) {
  const token = generateRandomSixDigitNumber();
  await prisma.user.update({
    where: { id: userId },
    data: { [field]: token },
  });
  return token;
}

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await findUserByEmail(input.email);
      if (!(await argon2.verify(user.password, input.password))) {
        throw new Error(ERRORS.INVALID_CREDENTIALS);
      }
      const Session = await createSessionFor(user.id);
      return { ...user, Session };
    }),

  signUp: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      if (await prisma.user.count({ where: { email: input.email } })) {
        throw new Error("Email already in use.");
      }
      const hash = await argon2.hash(input.password);
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hash,
          verificationToken: 0,
        },
      });

      const verificationToken = await generateAndStoreToken(
        user.id,
        "verificationToken",
      );
      await sendTokenEmail(
        user.email,
        "Verify your account",
        VerifyTokenTemplate,
        verificationToken,
      );

      const Session = await createSessionFor(user.id);
      return { ...user, Session };
    }),

  loginWithToken: publicProcedure
    .input(z.string())
    .mutation(async ({ input: token }) => {
      const session = await prisma.session.findFirst({
        where: { token, valid: true },
      });
      if (!session) throw new Error(ERRORS.NOT_FOUND);

      const user = await prisma.user.findUnique({
        where: { id: session.userId },
      });
      if (!user) throw new Error(ERRORS.NOT_FOUND);

      return { ...user, Session: session };
    }),

  invalidateSession: publicProcedure
    .input(z.string())
    .mutation(async ({ input: token }) => {
      return prisma.session.update({
        where: { token },
        data: { valid: false },
      });
    }),

  verifyEmail: publicProcedure
    .input(z.object({ email: z.string().email(), token: z.number() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
          verificationToken: input.token,
        },
      });
      if (!user) throw new Error("Invalid verification token.");

      // mark verified and clear token
      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true, verificationToken: undefined },
      });

      return { success: true };
    }),

  resendVerificationToken: publicProcedure
    .input(z.string().email())
    .mutation(async ({ input: email }) => {
      const user = await findUserByEmail(email);
      if (user.verified) throw new Error(ERRORS.ALREADY_VERIFIED);

      const newToken = await generateAndStoreToken(
        user.id,
        "verificationToken",
      );
      await sendTokenEmail(
        user.email,
        "Verify your account",
        VerifyTokenTemplate,
        newToken,
      );
      return { success: true };
    }),

  createResetPasswordToken: publicProcedure
    .input(z.string().email())
    .mutation(async ({ input: email }) => {
      const user = await findUserByEmail(email);
      const resetToken = await generateAndStoreToken(
        user.id,
        "passwordResetToken",
      );
      await sendTokenEmail(
        user.email,
        "Reset password token",
        ResetPasswordTemplate,
        resetToken,
      );
      return { success: true };
    }),

  verifyResetPasswordToken: publicProcedure
    .input(z.object({ email: z.string().email(), token: z.number() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
          passwordResetToken: input.token,
        },
      });
      if (!user) throw new Error("Invalid reset password token.");
      return { success: true };
    }),

  updatePassword: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const hash = await argon2.hash(input.password);
      await prisma.user.update({
        where: { email: input.email },
        data: { password: hash, passwordResetToken: undefined },
      });
      return { success: true };
    }),
});
