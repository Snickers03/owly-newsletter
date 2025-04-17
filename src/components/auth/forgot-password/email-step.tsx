"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseFormField } from "@/components/ui/project/base-form-field";

const emailSchema = z.object({
  email: z.string().email(),
});

interface EmailStepProps {
  onSubmit: (email: string) => void;
}

export function EmailStep({ onSubmit }: EmailStepProps) {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function handleSubmit(data: z.infer<typeof emailSchema>) {
    onSubmit(data.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Forgot Password</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email address and we&apos;ll send you a verification code
            to reset your password
          </p>
        </div>
        <div className='grid gap-6'>
          <BaseFormField
            control={form.control}
            name='email'
            label='Email'
            placeholder='john.doe@gmail.com'
          />
          <Button type='submit' className='w-full'>
            Send Verification Code
          </Button>
        </div>
        <div className='text-center text-sm'>
          Remember your password?{" "}
          <Link href='/login' className='underline underline-offset-4'>
            Back to login
          </Link>
        </div>
      </form>
    </Form>
  );
}
