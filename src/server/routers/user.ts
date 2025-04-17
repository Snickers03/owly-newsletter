import { prisma } from "@/lib/prisma";
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
});
