import { Calendar, Clock, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { NewsletterComponent } from "@/components/newsletter/create/newsletter-creator";

interface NewsletterPreviewProps {
  title: string;
  components: NewsletterComponent[];
  interval: string;
  time: string;
}

export function NewsletterPreview({
  title,
  components,
  interval,
  time,
}: NewsletterPreviewProps) {
  // Format the interval for display
  const formatInterval = (interval: string) => {
    switch (interval) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      default:
        return interval;
    }
  };

  // Get cryptocurrency symbol
  const getCryptoSymbol = (name: string) => {
    switch (name) {
      case "Bitcoin":
        return "BTC";
      case "Ethereum":
        return "ETH";
      case "Monero":
        return "XMR";
      default:
        return name;
    }
  };

  // Get cryptocurrency price (mock data)
  const getCryptoPrice = (name: string) => {
    switch (name) {
      case "Bitcoin":
        return "$48,256.12";
      case "Ethereum":
        return "$3,487.25";
      case "Monero":
        return "$178.63";
      default:
        return "$0.00";
    }
  };

  // Get cryptocurrency change (mock data)
  const getCryptoChange = (name: string) => {
    switch (name) {
      case "Bitcoin":
        return "+2.4%";
      case "Ethereum":
        return "+1.8%";
      case "Monero":
        return "+3.2%";
      default:
        return "0%";
    }
  };

  // Filter out components that don't have required parameters set
  const validComponents = components.filter(
    (component) =>
      (component.type === "weather" && component.params.city) ||
      (component.type === "crypto" && component.params.currency),
  );

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
            <span>{formatInterval(interval)}</span>
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
            {validComponents.map((component) => (
              <div key={component.id} className='rounded-lg border p-3'>
                {component.type === "weather" && component.params.city && (
                  <div className='space-y-1'>
                    <h3 className='text-sm font-medium'>Weather Forecast</h3>
                    <div className='flex items-center'>
                      <div className='mr-2 rounded-full bg-blue-100 p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-blue-500'
                        >
                          <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
                        </svg>
                      </div>
                      <div>
                        <p className='text-sm font-semibold'>
                          {component.params.city}
                        </p>
                        <p className='text-muted-foreground text-xs'>
                          22°C, Partly cloudy
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {component.type === "crypto" && component.params.currency && (
                  <div className='space-y-1'>
                    <h3 className='text-sm font-medium'>
                      Cryptocurrency Price
                    </h3>
                    <div className='flex items-center'>
                      <div className='mr-2 rounded-full bg-green-100 p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-green-500'
                        >
                          <rect width='18' height='12' x='3' y='8' rx='2' />
                          <path d='M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2' />
                          <circle cx='12' cy='14' r='2' />
                          <path d='M12 12v-1' />
                          <path d='M12 17v-1' />
                        </svg>
                      </div>
                      <div>
                        <p className='text-sm font-semibold'>
                          {component.params.currency}
                          {component.params.currency &&
                            ` (${getCryptoSymbol(component.params.currency)})`}
                        </p>
                        <div className='flex items-center text-xs'>
                          <span className='font-medium text-green-600'>
                            {getCryptoPrice(component.params.currency || "")}
                          </span>
                          <span className='ml-1 text-green-600'>
                            {getCryptoChange(component.params.currency || "")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='text-muted-foreground rounded-b-lg border-t bg-gray-50 px-4 py-3 text-center text-xs'>
        <p className='w-full text-xs'>
          You are receiving this newsletter because you subscribed to it.
          <a href='#' className='text-primary ml-1 hover:underline'>
            Unsubscribe
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
