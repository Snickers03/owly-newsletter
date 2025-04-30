import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { z } from "zod";

import NewsletterTemplateEmail from "../../../emails/newsletter-template-email";
import { fetchCryptoData } from "../services/crypto.service";
import { fetchWeatherData } from "../services/weather.service";
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
                currencies: z.array(z.string()).optional(),
                quote: z.string().optional(),
                author: z.string().optional(),
              })
              .optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, title, interval, time, components } = input;

      return await prisma.newsletter.create({
        data: {
          userId: userId,
          title: title,
          interval: interval,
          time: time,
          components: {
            create: components.map((c, index) => ({
              type: c.type,
              order: index,
              ...(c.type === "weather" && {
                weather: {
                  create: {
                    city: c.params?.city ?? "",
                  },
                },
              }),
              ...(c.type === "crypto" && {
                crypto: {
                  create: {
                    currencies: c.params?.currencies?.length
                      ? c.params.currencies.join(",")
                      : "",
                  },
                },
              }),
              ...(c.type === "quote" && {
                quote: {
                  create: {
                    quote: c.params?.quote ?? "",
                    author: c.params?.author ?? "",
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
        token: z.string(),
        components: z.array(
          z.object({
            type: z.string(),
            order: z.number(),
            params: z
              .object({
                city: z.string().optional(),
                currencies: z.array(z.string()).optional(),
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

      const order = input.components
        .map((component) => ({
          type: component.type,
          order: component.order,
        }))
        .sort((a, b) => a.order - b.order);

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
      let cryptoInfos = null;
      const currenciesSymbols = input.components
        .filter((component) => component.type === "crypto")
        .map((component) => component.params?.currencies)
        .flat()
        .filter((currency) => currency !== undefined && currency !== null);

      if (currenciesSymbols.length > 0) {
        cryptoInfos = await fetchCryptoData(currenciesSymbols);
      }

      const quoteInfos = input.components
        .filter((component) => component.type === "quote")
        .map((component) => ({
          quote: component.params?.quote ?? "",
          author: component.params?.author ?? "",
        }));

      return await resend.emails.send({
        from: "Niklas <clubverse@niklas.sh>",
        to: input.userEmail,
        subject: input.title,
        react: NewsletterTemplateEmail({
          title: input.title,
          time: input.time,
          interval: input.interval,
          cryptoInfo: cryptoInfos,
          weatherInfo: weatherInfo,
          quoteInfos: quoteInfos,
          token: input.token,
          order: order,
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
  unsubscribe: publicProcedure
    .input(
      z.object({
        token: z.string(),
        reason: z.string().optional(),
        feedback: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { token, reason, feedback } = input;
      const updatedNewsletter = await prisma.newsletter.update({
        where: {
          token: token,
        },
        data: {
          active: false,
        },
      });
      await prisma.unsubscribe.create({
        data: {
          newsletterId: updatedNewsletter.id,
          userId: updatedNewsletter.userId,
          reason: reason ?? "",
          feedback: feedback ?? "",
        },
      });
      return null;
    }),
  validateToken: publicProcedure.input(z.string()).query(async (opts) => {
    const newsletter = await prisma.newsletter.findUnique({
      where: {
        token: opts.input,
      },
    });
    if (!newsletter || !newsletter.active) {
      throw new Error("Invalid token");
    }
    return newsletter;
  }),
  getNameById: publicProcedure.input(z.string()).query(async (opts) => {
    const newsletter = await prisma.newsletter.findUnique({
      where: {
        id: opts.input,
      },
    });
    if (!newsletter) {
      throw new Error("Newsletter not found");
    }
    return newsletter.title;
  }),
});
