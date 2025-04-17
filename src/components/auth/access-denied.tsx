import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AccessDeniedProps {
  message?: string;
  backUrl?: string;
  backLabel?: string;
}

export function AccessDenied({
  message = "You don't have permission to access this page.",
  backUrl = "/",
  backLabel = "Go back",
}: AccessDeniedProps) {
  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center p-4 text-center'>
      <div className='mb-4 rounded-full bg-red-100 p-3'>
        <ShieldAlert className='h-8 w-8 text-red-600' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Access Denied</h1>
      <p className='mb-6 max-w-md text-gray-500'>{message}</p>
      <Button asChild variant='outline' className='gap-2'>
        <Link href={backUrl}>
          <ArrowLeft className='h-4 w-4' />
          {backLabel}
        </Link>
      </Button>
    </div>
  );
}
