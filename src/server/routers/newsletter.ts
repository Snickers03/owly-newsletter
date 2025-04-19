import { prisma } from "@/lib/prisma";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const newsletterRouter = router({
  getById: publicProcedure.input(z.string()).query(async (opts) => {
    const newsletter = await prisma.newsletter.findUnique({
      where: {
        id: opts.input,
      },
      include: {
        components: {
          include: {
            crypto: true,
            weather: true,
            quote: true,
          },
        },
      },
    });
    if (!newsletter) {
      throw new Error("Newsletter not found");
    }
    return newsletter;
  }),
  getByUserId: publicProcedure.input(z.string()).query(async (opts) => {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        userId: opts.input,
      },
      include: {
        components: {
          include: {
            crypto: true,
            weather: true,
            quote: true,
          },
        },
      },
    });
    return newsletters;
  }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        title: z.string(),
        interval: z.enum(["daily", "weekly", "monthly"]),
        time: z.string(),
        components: z.array(
          z.object({
            type: z.enum(["weather", "crypto", "quote"]),
            params: z
              .object({
                city: z.string().optional(),
                currency: z.string().optional(),
                quote: z.string().optional(),
                author: z.string().optional(),
              })
              .optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const { title, userId, interval, time, components } = input;

      return await prisma.newsletter.create({
        data: {
          title: title,
          userId: userId,
          interval: interval,
          time: time,
          components: {
            create: components.map((comp, index) => ({
              type: comp.type,
              order: index,
              ...(comp.type === "weather" && {
                weather: {
                  create: {
                    city: comp.params?.city ?? "",
                  },
                },
              }),
              ...(comp.type === "crypto" && {
                crypto: {
                  create: {
                    currency: comp.params?.currency ?? "",
                  },
                },
              }),
              ...(comp.type === "quote" && {
                quote: {
                  create: {
                    quote: comp.params?.quote ?? "",
                    author: comp.params?.author ?? "Unknown",
                  },
                },
              }),
            })),
          },
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(async (opts) => {
    return await prisma.newsletter.delete({
      where: {
        id: opts.input,
      },
    });
  }),
});
