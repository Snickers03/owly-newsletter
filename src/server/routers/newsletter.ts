import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { z } from "zod";

import NewsletterTemplateEmail from "../../../emails/newsletter-template-email";
import { fetchCryptoData } from "../services/cryptoService";
import { fetchWeatherData } from "../services/weatherService";
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

      const weatherComponentCity = input.components
        .filter((component) => component.type === "weather")
        .map((component) => component.params?.city);
      const city = weatherComponentCity[0] ?? null;
      let weatherInfo = null;
      if (city) {
        const weather = await fetchWeatherData(city ?? "");
        weatherInfo = {
          city: city ?? "",
          temperature: weather.temperature,
          condition: weather.condition,
        };
      }

      const cryptoComponentsCurrencies = input.components
        .filter((component) => component.type === "crypto")
        .map((component) => {
          const currency = component.params?.currency;
          // TODO: safe symbol instead of name in db
          if (currency?.toLowerCase() === "bitcoin") return "BTC";
          if (currency?.toLowerCase() === "ethereum") return "ETH";
          return currency;
        })
        .filter((currency): currency is string => !!currency);
      let cryptoInfo = null;
      if (cryptoComponentsCurrencies.length > 0) {
        cryptoInfo = await fetchCryptoData(cryptoComponentsCurrencies);
      }

      return await resend.emails.send({
        from: "Niklas <clubverse@niklas.sh>",
        to: input.userEmail,
        subject: input.title,
        react: NewsletterTemplateEmail({
          title: input.title,
          time: input.time,
          interval: input.interval,
          ...(weatherInfo ? { weatherInfo } : {}),
          ...(cryptoInfo ? { cryptoInfo } : {}),
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
