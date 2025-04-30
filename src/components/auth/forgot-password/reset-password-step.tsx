"use client";

import { enterNewPasswordSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseFormField } from "@/components/ui/project/base-form-field";

interface ResetPasswordStepProps {
  onSubmit: (password: string) => void;
  onBack: () => void;
}

export function ResetPasswordStep({
  onSubmit,
  onBack,
}: ResetPasswordStepProps) {
  const form = useForm<z.infer<typeof enterNewPasswordSchema>>({
    resolver: zodResolver(enterNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function handleSubmit(data: z.infer<typeof enterNewPasswordSchema>) {
    onSubmit(data.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Reset Your Password</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Please enter your new password below
          </p>
        </div>
        <div className='grid gap-6'>
          <BaseFormField
            control={form.control}
            name='password'
            label='New Password'
            type='password'
            placeholder='********'
          />
          <BaseFormField
            control={form.control}
            name='confirmPassword'
            label='Confirm New Password'
            type='password'
            placeholder='********'
          />
          <Button type='submit' className='w-full'>
            Reset Password
          </Button>
          <Button
            type='button'
            variant='outline'
            className='flex w-full items-center justify-center gap-2'
            onClick={onBack}
          >
            <ArrowLeft className='h-4 w-4' /> Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
