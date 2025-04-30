"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";

import { Form } from "../ui/form";
import { BaseFormField } from "../ui/project/base-form-field";
import { VerificationStep } from "./forgot-password/verification-step";

export function SignupForm() {
  const [step, setStep] = useState<"signup" | "verification">("signup");
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  // Read email from cookie once on mount
  const cookieEmail = Cookies.get("email") || "";

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: cookieEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUp, isPending: isSigningUp } =
    trpc.auth.signUp.useMutation({
      onSuccess: (_, variables) => {
        setEmail(variables.email);
        setCooldown(60);
        setStep("verification");
      },
      onError: (error) => {
        if (error.message === "Email already in use") {
          form.setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        } else {
          console.error("Signup failed", error);
        }
      },
    });

  const { mutate: verifyEmail } = trpc.auth.verifyEmail.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Verification failed", error);
    },
  });

  const { mutate: resendVerificationToken } =
    trpc.auth.resendVerificationToken.useMutation({
      onSuccess: () => {
        setCooldown(60);
      },
      onError: (error) => {
        console.error("Failed to resend verification code", error);
      },
      onSettled: () => {
        setIsResending(false);
      },
    });

  useEffect(() => {
    const timer =
      cooldown > 0 ? setTimeout(() => setCooldown(cooldown - 1), 1000) : null;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  const handleSignupSubmit = (data: z.infer<typeof signUpSchema>) => {
    signUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const handleVerificationSubmit = (token: string) => {
    verifyEmail({ email, token: Number(token) });
  };

  const handleResendCode = () => {
    if (cooldown > 0 || !email) return;
    setIsResending(true);
    resendVerificationToken(email);
  };

  const renderStep = () => {
    switch (step) {
      case "signup":
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignupSubmit)}
              className='space-y-4'
            >
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Create an account</h1>
                <p className='text-muted-foreground text-sm text-balance'>
                  Enter your details below to create your account
                </p>
              </div>
              <div className='grid gap-6'>
                <BaseFormField
                  control={form.control}
                  name='name'
                  label='Name'
                  placeholder='John Doe'
                  autoComplete='name'
                />
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
                  autoComplete='new-password'
                />
                <BaseFormField
                  control={form.control}
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  placeholder='********'
                  autoComplete='new-password'
                />
                <Button type='submit' className='w-full' disabled={isSigningUp}>
                  {isSigningUp ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
              <div className='text-center text-sm'>
                Already have an account?{" "}
                <a href='/login' className='underline underline-offset-4'>
                  Login
                </a>
              </div>
            </form>
          </Form>
        );

      case "verification":
        return (
          <VerificationStep
            onSubmit={handleVerificationSubmit}
            onBack={() => setStep("signup")}
            onResend={handleResendCode}
            email={email}
            cooldown={cooldown}
            isResending={isResending}
          />
        );

      default:
        return null;
    }
  };

  return <div className='w-full'>{renderStep()}</div>;
}
