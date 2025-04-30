"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { APP_MAIN_PAGE } from "@/config";
import { loginSchema } from "@/schemas/auth.schema";
import { useUserStore } from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseFormField } from "@/components/ui/project/base-form-field";
import { trpc } from "@/app/_trpc/client";

export function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = trpc.auth.login.useMutation({
    onSuccess: (user) => {
      setUser(user);
      document.cookie = `token=${user.Session.token}; path=/`;
      form.reset();
      router.push(APP_MAIN_PAGE);
    },
    onError: (error) => {
      if (error.message === "User not found.") {
        form.setError("email", {
          type: "manual",
          message: "Email not found",
        });
      } else if (error.message === "Invalid password.") {
        form.setError("password", {
          type: "manual",
          message: "Invalid password",
        });
      } else {
        console.error("Login failed", error);
      }
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    login({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>
        <div className='grid gap-6'>
          <BaseFormField
            control={form.control}
            name='email'
            label='Email'
            placeholder='john.doe@gmail.com'
            autoComplete='email'
          />
          <BaseFormField
            control={form.control}
            name='password'
            label='Password'
            type='password'
            placeholder='********'
            autoComplete='password'
          />
          <Link
            href='/forgot-password'
            className='ml-auto text-sm underline-offset-4 hover:underline'
          >
            Forgot your password?
          </Link>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </div>
        <div className='text-center text-sm'>
          Don&apos;t have an account?{" "}
          <Link href='/signup' className='underline underline-offset-4'>
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
