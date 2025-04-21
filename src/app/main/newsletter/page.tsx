"use client";

import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { trpc } from "@/app/_trpc/client";

export default function Page() {
  const user = useUserStore((state) => state.user);

  const { data: newsletters, refetch } = trpc.newsletter.getByUserId.useQuery(
    user ? user.id : "",
    {
      enabled: !!user,
    },
  );

  const { mutate: deleteNewsletter } = trpc.newsletter.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting newsletter:", error);
    },
  });

  const { mutate: toggleActive } = trpc.newsletter.toggleActive.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error toggling newsletter:", error);
    },
  });

  return (
    <MainLayout>
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
        {!newsletters || newsletters.length === 0 ? (
          <div className='bg-muted/30 text-muted-foreground col-span-3 flex h-[200px] items-center justify-center rounded-lg border border-dashed'>
            <p className='text-sm'>No newsletters found.</p>
          </div>
        ) : (
          newsletters.map((newsletter) => (
            <NewsletterCard
              key={newsletter.id}
              newsletter={newsletter}
              deleteNewsletter={deleteNewsletter}
              toggleActive={(id, currentStatus) =>
                toggleActive({ id, active: !currentStatus })
              }
            />
          ))
        )}
      </div>
    </MainLayout>
  );
}
