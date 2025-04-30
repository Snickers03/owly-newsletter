import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  delete: publicProcedure.input(z.string()).mutation(async (opts) => {
    return await prisma.user.delete({
      where: {
        id: opts.input,
      },
    });
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
