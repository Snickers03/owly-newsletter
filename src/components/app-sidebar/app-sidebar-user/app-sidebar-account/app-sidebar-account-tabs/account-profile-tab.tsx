"use client";

import { useEffect, useMemo, useState } from "react";
import { updateNameSchema } from "@/lib/schemas/auth.schema";
import { useUserStore, type ExtendedUser } from "@/store/user-store";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Camera, CheckCircle2, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VerificationStep } from "@/components/auth/forgot-password/verification-step";
import { trpc } from "@/app/_trpc/client";

interface ProfileTabProps {
  user: ExtendedUser;
  closeDialog: () => void;
}

export function AccountProfileTab({ user, closeDialog }: ProfileTabProps) {
  const updateUser = useUserStore((state) => state.updateUser);

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatarUrl || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const [step, setStep] = useState<"profile" | "verification">("profile");
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const name = form.watch("name");

  const isModified = useMemo(() => {
    return name !== user.name || avatarUrl !== (user.avatarUrl || "");
  }, [name, avatarUrl, user.name, user.avatarUrl]);

  const { mutate: updateProfile } = trpc.user.updateProfile.useMutation({
    onSuccess: (user) => {
      updateUser(user);
      closeDialog();
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const { mutate: verifyEmail } = trpc.auth.verifyEmail.useMutation({
    onSuccess: () => {
      updateUser({ ...user, verified: true });
      setVerificationSuccess(true);

      // Return to profile after showing success message
      setTimeout(() => {
        setStep("profile");
      }, 2000);
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

  const onSubmit = (data: z.infer<typeof updateNameSchema>) => {
    updateProfile({
      id: user.id,
      name: data.name,
      avatarUrl: avatarUrl,
    });
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setAvatarUrl("");
  };

  const handleVerifyEmail = () => {
    setStep("verification");
    if (cooldown === 0) {
      setIsResending(true);
      resendVerificationToken(user.email);
    }
  };

  const handleResendVerification = () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    resendVerificationToken(user.email);
  };

  const handleVerificationSubmit = (token: string) => {
    verifyEmail({ email: user.email, token: Number(token) });
  };

  return (
    <>
      {step === "profile" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 pt-4'
          >
            <div className='mb-6 flex items-center justify-center'>
              <div className='relative'>
                {isUploading ? (
                  <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100'>
                    <Loader2 className='h-10 w-10 animate-spin text-gray-500' />
                  </div>
                ) : (
                  <Avatar className='h-20 w-20'>
                    <AvatarImage src={avatarPreview || undefined} alt={name} />
                    <AvatarFallback className='text-lg'>
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                  <div className='bg-opacity-50 absolute inset-0 rounded-full bg-black'></div>
                  <div className='relative z-10 text-white'>
                    <UploadButton
                      endpoint='imageUploader'
                      onUploadBegin={() => {
                        setIsUploading(true);
                      }}
                      onClientUploadComplete={(res) => {
                        setIsUploading(false);
                        const imageUrl = res[0].ufsUrl;
                        setAvatarPreview(imageUrl);
                        setAvatarUrl(imageUrl);
                      }}
                      onUploadError={(error: Error) => {
                        console.error("Upload failed:", error);
                      }}
                      appearance={{
                        button:
                          "bg-transparent border-none p-0 m-0 text-white hover:text-gray-200",
                        container: "flex items-center justify-center",
                      }}
                      content={{
                        button() {
                          return <Camera className='h-6 w-6' />;
                        },
                        allowedContent() {
                          return <></>;
                        },
                      }}
                    />
                  </div>
                </div>

                {avatarPreview && (
                  <button
                    type='button'
                    onClick={removeAvatar}
                    className='absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white'
                    aria-label='Remove avatar'
                  >
                    <X className='h-3 w-3' />
                  </button>
                )}
              </div>
            </div>

            <div className='mb-2 text-center text-sm text-gray-500'>
              {avatarPreview
                ? "Click the avatar to change it"
                : "Click to add an avatar"}
            </div>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Your name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='email'>Email</Label>
                {user.verified ? (
                  <Badge
                    variant='outline'
                    className='flex items-center gap-1 border-green-200 bg-green-50 text-green-600'
                  >
                    <CheckCircle2 className='h-3 w-3' />
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant='outline'
                    className='flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-600'
                  >
                    <AlertCircle className='h-3 w-3' />
                    Not Verified
                  </Badge>
                )}
              </div>
              <Input id='email' type='email' value={user.email} disabled />
            </div>

            {!user.verified && (
              <div className='pt-2'>
                {verificationSuccess ? (
                  <Alert className='border-green-200 bg-green-50 text-green-800'>
                    <AlertDescription>
                      Email verified successfully!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Button
                    variant='outline'
                    className='w-full border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:text-amber-900'
                    onClick={handleVerifyEmail}
                  >
                    Verify Email Address
                  </Button>
                )}
              </div>
            )}

            <div className='flex justify-end pt-2'>
              <Button type='submit' disabled={!isModified}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <VerificationStep
          onSubmit={handleVerificationSubmit}
          onBackText='Back to Profile'
          onBack={() => setStep("profile")}
          onResend={handleResendVerification}
          email={user.email}
          cooldown={cooldown}
          isResending={isResending}
        />
      )}
    </>
  );
}
