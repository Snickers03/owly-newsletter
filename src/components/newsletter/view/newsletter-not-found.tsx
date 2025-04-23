import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/app/main/newsletter/layout";

export const NewsletterNotFound = () => {
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
};
