import Link from "next/link";
import { toNormalCase } from "@/lib/utils";
import { INewsletterComponent } from "@/types";
import { cryptosPreviewData } from "@/utils/crypto.data";
import { Calendar, Clock, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface NewsletterPreviewProps {
  title: string;
  token: string;
  components: INewsletterComponent[];
  interval: string;
  time: string;
}

export function NewsletterPreview({
  title,
  token,
  components,
  interval,
  time,
}: NewsletterPreviewProps) {
  const validComponents = components.filter(({ type, params }) => {
    if (type === "weather" && !params.city) return false;
    if (
      type === "crypto" &&
      (!params.currencies || params.currencies.length === 0)
    )
      return false;
    return true;
  });

  const renderComponent = (component: INewsletterComponent) => {
    const { id, type, params } = component;

    if (type === "weather") {
      return (
        <div key={id} className='rounded-lg border p-3'>
          <div>
            <h3 className='pb-2 text-sm font-medium'>Weather Forecast</h3>
            <div>
              <p className='text-sm font-semibold'>{params.city}</p>
              <p className='text-muted-foreground text-xs'>
                22°C, Partly cloudy
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (type === "crypto") {
      return (
        <div key={id} className='rounded-lg border p-3'>
          <h3 className='pb-2 text-sm font-medium'>Cryptocurrency Prices</h3>
          <div className='space-y-2'>
            {(params.currencies || []).map((currency) => {
              const crypto = cryptosPreviewData.find(
                (c) => c.name === currency || c.symbol === currency,
              );
              if (!crypto) return null;

              return (
                <div key={crypto.name}>
                  <div>
                    <p className='text-sm font-semibold'>
                      {crypto.name} ({crypto.symbol})
                    </p>
                    <div className='flex items-center text-xs'>
                      <p className='text-muted-foreground'>
                        Price: {crypto.price}€
                      </p>
                      <span className='text-muted-foreground mx-1'>|</span>
                      <p className='text-muted-foreground'>
                        Change: {crypto.change}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (type === "quote") {
      let { quote, author } = params;
      if (!quote) return null;

      return (
        <div key={id} className='rounded-lg border p-3'>
          <blockquote className='text-muted-foreground italic'>
            "{quote}"
            <br />
            <span className='text-foreground mt-2 block text-right text-sm'>
              – {author}
            </span>
          </blockquote>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className='w-full gap-3 border py-0 shadow-sm'>
      <CardHeader className='rounded-t-lg border-b bg-gray-50 px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Mail className='text-primary mr-2 h-4 w-4' />
            <span className='text-sm font-bold'>{title}</span>
          </div>
          <div className='text-muted-foreground flex items-center text-xs'>
            <Clock className='mr-1 h-3 w-3' />
            <span>{time}</span>
            <Calendar className='mr-1 ml-2 h-3 w-3' />
            <span>{toNormalCase(interval)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='bg-white p-4'>
        {validComponents.length === 0 ? (
          <div className='text-muted-foreground py-4 text-center text-sm'>
            <p>No content added</p>
          </div>
        ) : (
          <div className='space-y-3'>
            {validComponents.map(renderComponent)}
          </div>
        )}
      </CardContent>

      <CardFooter className='text-muted-foreground rounded-b-lg border-t bg-gray-50 px-4 py-3 text-center text-xs'>
        <p className='w-full text-xs'>
          You are receiving this newsletter because you subscribed to it.
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${token}`}
            className='text-primary ml-1 hover:underline'
          >
            Unsubscribe
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
