// components/UnsubscribeClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/app/_trpc/client";

export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [reason, setReason] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const { error, isPending: validateTokenPending } =
    trpc.newsletter.validateToken.useQuery(token ?? "", {
      enabled: !!token,
    });

  const { mutate: unsubscribeNewsletter, isPending } =
    trpc.newsletter.unsubscribe.useMutation({
      onSuccess: () => {
        setIsUnsubscribed(true);
      },
    });

  const handleUnsubscribe = () => {
    if (!token) return;

    unsubscribeNewsletter({
      token,
      reason,
      feedback,
    });
  };

  if (validateTokenPending) {
    return (
      <div className='flex h-screen justify-center bg-[#f6e6cf62]'>
        <div className='container max-w-md py-12'>
          <Card>
            <CardHeader>
              <CardTitle>Validating...</CardTitle>
              <CardDescription>Please wait...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!token || error) {
    return (
      <div className='flex h-screen justify-center bg-[#f6e6cf62]'>
        <div className='container max-w-md py-12'>
          <Card>
            <CardHeader>
              <CardTitle>Invalid Unsubscribe Link</CardTitle>
              <CardDescription>
                The unsubscribe link you followed appears to be invalid or
                expired.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href='/' className='w-full'>
                <Button variant='outline' className='w-full'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen justify-center bg-[#f6e6cf62]'>
      <div className='container max-w-md py-12'>
        <Card>
          <CardHeader>
            <div className='mb-4 flex items-center justify-center'>
              <div className='bg-muted rounded-full p-3'>
                <Mail className='h-6 w-6' />
              </div>
            </div>
            <CardTitle className='text-center text-xl'>
              Unsubscribe from Newsletter
            </CardTitle>
            <CardDescription className='text-center'>
              {isUnsubscribed
                ? `You've been successfully unsubscribed.`
                : `You're about to unsubscribe from our newsletter.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isUnsubscribed ? (
              <div className='flex flex-col items-center justify-center space-y-4 py-6'>
                <CheckCircle className='h-12 w-12 text-green-500' />
                <p className='text-muted-foreground text-center'>
                  Thank you for your feedback. You&apos;ve been successfully
                  unsubscribed and won&apos;t receive any more newsletters from
                  us.
                </p>
              </div>
            ) : (
              <div className='space-y-6'>
                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>
                    We&apos;re sorry to see you go. Would you mind telling us
                    why?
                  </h3>
                  <RadioGroup defaultValue={reason} onValueChange={setReason}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='too-frequent' id='too-frequent' />
                      <Label htmlFor='too-frequent'>Too many emails</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='not-relevant' id='not-relevant' />
                      <Label htmlFor='not-relevant'>Content not relevant</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='didnt-signup' id='didnt-signup' />
                      <Label htmlFor='didnt-signup'>
                        I didn&apos;t sign up for this
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='other' id='other' />
                      <Label htmlFor='other'>Other reason</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='feedback'>
                    Additional feedback (optional)
                  </Label>
                  <Textarea
                    id='feedback'
                    placeholder='Tell us how we could improve...'
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className='flex flex-col space-y-2'>
            {isUnsubscribed ? (
              <Link href='/' className='w-full'>
                <Button variant='outline' className='w-full'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Return to Home
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  className='w-full'
                  onClick={handleUnsubscribe}
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Unsubscribe"}
                </Button>
                <Link href='/' className='w-full'>
                  <Button variant='outline' className='w-full'>
                    Cancel
                  </Button>
                </Link>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
