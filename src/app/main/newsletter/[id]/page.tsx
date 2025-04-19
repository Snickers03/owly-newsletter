"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { trpc } from "@/app/_trpc/client";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: newsletter } = trpc.newsletter.getById.useQuery(id, {
    enabled: !!id,
  });

  if (!newsletter) {
    return (
      <MainLayout>
        <h1 className='mb-2 text-3xl font-bold'>Newsletter Not Found</h1>
        <p className='text-muted-foreground mb-3'>
          The newsletter you are trying to edit does not exist.
        </p>
        <Link href='/main/newsletter'>
          <Button variant='ghost' size='sm' className='gap-1'>
            <ArrowLeft className='h-4 w-4' />
            Back to Newsletters
          </Button>
        </Link>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <header className='flex items-start justify-between'>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>Edit Newsletter</h1>
          <p className='text-muted-foreground mb-8'>
            Modify your newsletter settings and content as needed.
          </p>
        </div>
        <Link href='/main/newsletter'>
          <Button variant='ghost' size='sm' className='gap-1'>
            <ArrowLeft className='h-4 w-4' />
            Back to Newsletters
          </Button>
        </Link>
      </header>

      {/* <NewsletterEditor
        initialData={{
          title: newsletter.title,
          interval: newsletter.interval,
          time: newsletter.time,
          components: newsletter.components,
        }}
        onSave={() => {}}
        mode='edit'
      /> */}
    </MainLayout>
  );
}
