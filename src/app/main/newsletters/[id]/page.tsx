"use client";

import { use } from "react";
import Link from "next/link";
import { APP_MAIN_PAGE } from "@/config";
import {
  extractComponentParams,
  transformComponents,
} from "@/lib/utils/components.utils";
import { useUserStore } from "@/store/user-store";
import { INewsletterComponent } from "@/types";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { NewsletterPreview } from "@/components/newsletter/create/newsletter-preview";
import { NewsletterNotFound } from "@/components/newsletter/view/newsletter-not-found";
import { trpc } from "@/app/_trpc/client";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = useUserStore((state) => state.user);

  const { data: newsletter } = trpc.newsletter.getById.useQuery(id, {
    enabled: !!id,
  });

  const { mutate: sendNewsletter, isPending } =
    trpc.newsletter.sendNewsletter.useMutation({
      onSuccess: () => {
        toast.success("Newsletter sent successfully!");
      },
      onError: (error) => {
        console.error("Error sending newsletter: ", error);
      },
    });

  function handleSendNewsletter() {
    if (!newsletter) return;
    const componentsParams = extractComponentParams(newsletter.components);

    sendNewsletter({
      userEmail: user?.email ?? null,
      token: newsletter.token,
      title: newsletter.title,
      interval: newsletter.interval,
      time: newsletter.time,
      components: componentsParams,
    });
  }

  const transformedComponents: INewsletterComponent[] =
    transformComponents(newsletter?.components ?? []) ?? [];

  if (!newsletter) return <NewsletterNotFound />;

  return (
    <MainLayout newsletterTitle={newsletter.title}>
      <header className='flex items-start justify-between'>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>View Newsletter</h1>
          <p className='text-muted-foreground mb-8'>
            View your newsletter before sending it out.
          </p>
        </div>
        <Link href={APP_MAIN_PAGE}>
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
        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              Sending...
            </>
          ) : (
            <>
              Send Newsletter
              <Send className='h-4 w-4' />
            </>
          )}
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
