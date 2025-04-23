"use client";

import { use } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import {
  Component,
  CryptoParams,
  QuoteParams,
  WeatherParams,
} from "@prisma/client";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { NewsletterComponent } from "@/components/newsletter/create/newsletter-creator";
import { NewsletterPreview } from "@/components/newsletter/create/newsletter-preview";
import { NewsletterNotFound } from "@/components/newsletter/view/newsletter-not-found";
import { trpc } from "@/app/_trpc/client";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = useUserStore((state) => state.user);

  const { data: newsletter } = trpc.newsletter.getById.useQuery(id, {
    enabled: !!id,
  });

  const { mutate: sendNewsletter } = trpc.newsletter.sendNewsletter.useMutation(
    {
      onSuccess: () => {
        toast.success("Newsletter sent successfully!");
      },
      onError: (error) => {
        console.error("Error sending newsletter: ", error);
      },
    },
  );

  function handleSendNewsletter() {
    // extract components params
    const componentsParams = newsletter?.components.map((component) => {
      if (component.type === "crypto" && component.crypto) {
        return {
          type: "crypto",
          params: {
            currencies: component.crypto.currencies.split(","),
          },
          order: component.order,
        };
      }

      if (component.type === "weather" && component.weather) {
        return {
          type: "weather",
          params: {
            city: component.weather.city,
          },
          order: component.order,
        };
      }
      if (component.type === "quote" && component.quote) {
        return {
          type: "quote",
          params: {
            quote: component.quote.quote,
            author: component.quote.author,
          },
          order: component.order,
        };
      }

      throw new Error(
        `Unknown or incomplete component: ${JSON.stringify(component)}`,
      );
    });

    if (newsletter) {
      sendNewsletter({
        userEmail: user?.email ?? null,
        token: newsletter.token,
        title: newsletter.title,
        interval: newsletter.interval,
        time: newsletter.time,
        components: componentsParams ?? [],
      });
    }
  }

  interface ExtendedComponent extends Component {
    crypto?: CryptoParams | null;
    weather?: WeatherParams | null;
    quote?: QuoteParams | null;
  }

  function transformComponents(
    components: ExtendedComponent[],
  ): NewsletterComponent[] {
    return components.map((component) => {
      if (component.type === "crypto" && component?.crypto) {
        return {
          id: component.id,
          type: "crypto",
          isNew: false,
          params: {
            currencies: component.crypto.currencies.split(","),
          },
        };
      }

      if (component.type === "weather" && component.weather) {
        return {
          id: component.id,
          type: "weather",
          isNew: false,
          params: {
            city: component.weather.city,
          },
        };
      }
      if (component.type === "quote" && component.quote) {
        return {
          id: component.id,
          type: "quote",
          isNew: false,
          params: {
            quote: component.quote.quote,
            author: component.quote.author,
          },
        };
      }

      throw new Error(
        `Unknown or incomplete component: ${JSON.stringify(component)}`,
      );
    });
  }

  const transformedComponents: NewsletterComponent[] =
    transformComponents(newsletter?.components ?? []) ?? [];

  if (!newsletter) return <NewsletterNotFound />;

  return (
    <MainLayout>
      <header className='flex items-start justify-between'>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>View Newsletter</h1>
          <p className='text-muted-foreground mb-8'>
            View your newsletter before sending it out.
          </p>
        </div>
        <Link href='/main/newsletter'>
          <Button variant='ghost' size='sm' className='gap-1'>
            <ArrowLeft className='h-4 w-4' />
            Back to Newsletters
          </Button>
        </Link>
      </header>
      <div
        onClick={handleSendNewsletter}
        className='mb-3 flex items-center justify-end'
      >
        <Button>
          Send Newsletter
          <Send className='h-4 w-4' />
        </Button>
      </div>
      <NewsletterPreview
        title={newsletter.title}
        token={newsletter.token}
        interval={newsletter.interval}
        time={newsletter.time}
        components={transformedComponents}
      />
    </MainLayout>
  );
}
