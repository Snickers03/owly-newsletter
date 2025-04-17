import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";

// Sample newsletter data for demonstration
const sampleNewsletters = [
  {
    id: "1",
    title: "Daily Tech Updates",
    interval: "daily",
    time: "08:00",
    components: [
      { type: "weather", params: { city: "San Francisco" } },
      { type: "crypto", params: { currency: "Bitcoin" } },
    ],
    createdAt: "2023-04-15",
    subscribers: 128,
  },
  {
    id: "2",
    title: "Weekly Market Insights",
    interval: "weekly",
    time: "09:00",
    components: [
      { type: "crypto", params: { currency: "Ethereum" } },
      { type: "crypto", params: { currency: "Bitcoin" } },
    ],
    createdAt: "2023-03-22",
    subscribers: 256,
  },
  {
    id: "3",
    title: "Travel Weather",
    interval: "daily",
    time: "07:00",
    components: [
      { type: "weather", params: { city: "New York" } },
      { type: "weather", params: { city: "London" } },
      { type: "weather", params: { city: "Tokyo" } },
    ],
    createdAt: "2023-05-01",
    subscribers: 89,
  },
  {
    id: "4",
    title: "Crypto Portfolio Tracker",
    interval: "daily",
    time: "18:00",
    components: [
      { type: "crypto", params: { currency: "Bitcoin" } },
      { type: "crypto", params: { currency: "Ethereum" } },
      { type: "crypto", params: { currency: "Monero" } },
    ],
    createdAt: "2023-02-10",
    subscribers: 412,
  },
  {
    id: "5",
    title: "Monthly Digest",
    interval: "monthly",
    time: "10:00",
    components: [
      { type: "weather", params: { city: "Berlin" } },
      { type: "crypto", params: { currency: "Bitcoin" } },
    ],
    createdAt: "2023-01-05",
    subscribers: 753,
  },
];

export default function Page() {
  return (
    <MainLayout>
      <div className='px-6'>
        <header className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div>
            <h1 className='text-3xl font-bold'>Your Newsletters</h1>
            <p className='text-muted-foreground mt-1'>
              Manage and monitor all your newsletter.
            </p>
          </div>
          <Link href='/main/newsletter/create'>
            <Button>
              <PlusCircle className='mr-2 h-4 w-4' />
              Create Newsletter
            </Button>
          </Link>
        </header>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {sampleNewsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
