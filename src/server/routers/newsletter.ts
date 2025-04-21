import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { z } from "zod";

import NewsletterTemplateEmail from "../../../emails/newsletter-template-email";
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
  sendNewsletter: publicProcedure
    .input(
      z.object({
        userEmail: z.string().nullable(),
        title: z.string(),
        interval: z.string(),
        time: z.string(),
        components: z.array(
          z.object({
            type: z.string(),
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
      if (!input.userEmail) {
        throw new Error("User email is required");
      }

      // extract components
      const weatherExists =
        input.components.find((component) => component.type === "weather")
          ?.params ?? null;

      const weatherInfo = weatherExists
        ? {
            city: weatherExists.city ?? "-",
            temperature: "22°C", // Placeholder for temperature
          }
        : null;

      // fetch data for components
      const cryptoExists = input.components.find(
        (component) => component.type === "crypto",
      )?.params;
      let bitcoinPrice = null;

      if (cryptoExists) {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoExists.currency}&vs_currencies=eur`,
        );
        const data = await res.json();
        bitcoinPrice = data.bitcoin.eur;
      }
      return await resend.emails.send({
        from: "Niklas <clubverse@niklas.sh>",
        to: input.userEmail,
        subject: input.title,
        react: NewsletterTemplateEmail({
          title: input.title,
          time: input.time,
          interval: input.interval,
          weatherInfo: weatherInfo,
          cryptoInfo: [
            {
              name: cryptoExists?.currency ?? "CURRENCY",
              symbol: "SYMBOL",
              price: bitcoinPrice,
            },
          ],
        }),
      });
    }),
  toggleActive: publicProcedure
    .input(
      z.object({
        id: z.string(),
        active: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, active } = input;

      return await prisma.newsletter.update({
        where: {
          id: id,
        },
        data: {
          active: active,
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
    }),
});
