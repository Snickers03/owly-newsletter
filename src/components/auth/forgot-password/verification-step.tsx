"use client";

import { enterTokenSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseFormField } from "@/components/ui/project/base-form-field";

interface VerificationStepProps {
  onSubmit: (token: string) => void;
  onBack: () => void;
  onBackText?: string;
  onResend: () => void;
  email: string;
  cooldown: number;
  isResending: boolean;
}

export function VerificationStep({
  onSubmit,
  onBack,
  onBackText = "Back to Email",
  onResend,
  email,
  cooldown,
  isResending,
}: VerificationStepProps) {
  const form = useForm<z.infer<typeof enterTokenSchema>>({
    resolver: zodResolver(enterTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  function handleSubmit(data: z.infer<typeof enterTokenSchema>) {
    onSubmit(data.token);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Enter Verification Code</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            We&apos;ve sent a verification code to {email}. Please enter it
            below to continue.
          </p>
        </div>

        <div className='grid gap-6'>
          <BaseFormField
            control={form.control}
            name='token'
            label='Verification Code'
            placeholder='Enter code'
          />

          <Button type='submit' className='w-full'>
            Verify Code
          </Button>

          <Button
            type='button'
            variant='outline'
            className='flex w-full items-center justify-center gap-2'
            onClick={onBack}
          >
            <ArrowLeft className='h-4 w-4' /> {onBackText}
          </Button>
        </div>

        <div className='text-center text-sm'>
          Didn&apos;t receive a code?{" "}
          <button
            type='button'
            className={cn(
              "underline underline-offset-4",
              (cooldown > 0 || isResending) && "cursor-not-allowed opacity-50",
            )}
            onClick={onResend}
            disabled={cooldown > 0 || isResending}
          >
            {isResending
              ? "Sending..."
              : cooldown > 0
                ? `Resend code (${cooldown}s)`
                : "Resend code"}
          </button>
        </div>
      </form>
    </Form>
  );
}
