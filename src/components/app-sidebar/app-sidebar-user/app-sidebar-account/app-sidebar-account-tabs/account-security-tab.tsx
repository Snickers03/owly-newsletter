"use client";

import { changePasswordSchema } from "@/lib/schemas/auth.schema";
import { useUserStore } from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseFormField } from "@/components/ui/project/base-form-field";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/app/_trpc/client";

interface SecurityTabProps {
  onDeleteAccount: () => void;
}

export function SecurityTab({ onDeleteAccount }: SecurityTabProps) {
  const user = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: changePassword, isPending } =
    trpc.user.changePassword.useMutation({
      onSuccess: () => {
        form.reset();
        toast.success("Password changed successfully");
      },
      onError: (error) => {
        if (error.message === "Invalid password") {
          form.setError("currentPassword", {
            type: "manual",
            message: "Current password is incorrect",
          });
        } else {
          console.error("Change password failed", error);
        }
      },
    });

  function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    changePassword({
      email: user?.email ?? null,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <div className='space-y-6 pt-4'>
      {/* Password Change Section */}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium'>Change Password</h3>
          <p className='text-sm text-gray-500'>
            Update your password to keep your account secure.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <BaseFormField
              control={form.control}
              name='currentPassword'
              label='Current Password'
              type='password'
              autoComplete='current-password'
            />
            <BaseFormField
              control={form.control}
              name='newPassword'
              label='New Password'
              type='password'
              autoComplete='new-password'
            />
            <BaseFormField
              control={form.control}
              name='confirmPassword'
              label='Confirm New Password'
              type='password'
              autoComplete='new-password'
            />
            <Button type='submit' className='w-full' disabled={isPending}>
              Change Password
            </Button>
          </form>
        </Form>
      </div>

      <Separator className='my-4' />

      {/* Danger Zone Section */}
      <div className='space-y-4'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-medium text-red-600'>
            <AlertTriangle className='h-5 w-5' />
            Danger Zone
          </h3>
          <p className='text-sm text-red-500'>
            Actions here can&apos;t be undone. Please proceed with caution.
          </p>
        </div>
        <div className='space-y-4'>
          <p className='text-sm text-gray-500'>
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </p>
          <Button
            variant='destructive'
            className='w-full'
            onClick={onDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
