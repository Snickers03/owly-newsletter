"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { trpc } from "@/app/_trpc/client";

import { EmailStep } from "./forgot-password/email-step";
import { ResetPasswordStep } from "./forgot-password/reset-password-step";
import { VerificationStep } from "./forgot-password/verification-step";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<"email" | "verification" | "reset">("email");
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();

  const { mutate: sendResetPasswordToken } =
    trpc.auth.createResetPasswordToken.useMutation({
      onSuccess: (_, email) => {
        setEmail(email);
        setStep("verification");
        if (isResending) {
          setIsResending(false);
        }
        setCooldown(60);
      },
      onError: () => {
        return null;
      },
    });

  const { mutate: verifyResetPasswordToken } =
    trpc.auth.verifyResetPasswordToken.useMutation({
      onSuccess: () => {
        setStep("reset");
      },
      onError: (error) => {
        console.error("VERIFY RESET PASSWORD TOKEN ERROR: ", error);
      },
    });

  const { mutate: updatePassword } = trpc.auth.updatePassword.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("RESET PASSWORD ERROR: ", error);
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  const handleEmailSubmit = (submittedEmail: string): void => {
    sendResetPasswordToken(submittedEmail);
  };

  const handleResendCode = (): void => {
    if (cooldown > 0) return;
    setIsResending(true);
    sendResetPasswordToken(email);
  };

  const handleVerificationSubmit = (token: string): void => {
    verifyResetPasswordToken({
      email,
      token: Number(token),
    });
  };

  const handleResetSubmit = (newPassword: string): void => {
    updatePassword({
      email,
      password: newPassword,
    });
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return <EmailStep onSubmit={handleEmailSubmit} />;
      case "verification":
        return (
          <VerificationStep
            onSubmit={handleVerificationSubmit}
            onBack={() => setStep("email")}
            onResend={handleResendCode}
            email={email}
            cooldown={cooldown}
            isResending={isResending}
          />
        );
      case "reset":
        return (
          <ResetPasswordStep
            onSubmit={handleResetSubmit}
            onBack={() => setStep("verification")}
          />
        );
      default:
        return null;
    }
  };

  return <div className='w-full'>{renderStep()}</div>;
}
