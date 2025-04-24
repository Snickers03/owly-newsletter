import Link from "next/link";
import { APP_MAIN_PAGE } from "@/config";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";

export const NewsletterNotFound = () => {
  return (
    <MainLayout>
      <h1 className='mb-2 text-3xl font-bold'>Newsletter Not Found</h1>
      <p className='text-muted-foreground mb-3'>
        The newsletter you are trying to edit does not exist.
      </p>
      <Link href={APP_MAIN_PAGE}>
        <Button variant='ghost' size='sm' className='gap-1'>
          <ArrowLeft className='h-4 w-4' />
          Back to Newsletters
        </Button>
      </Link>
    </MainLayout>
  );
};
