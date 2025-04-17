"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "@/components/magicui/border-beam";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function EmailInputForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof emailSchema>) {
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 Minuten in ms
    Cookies.set("email", data.email, { path: "/", expires: expiry });
    router.push("/signup");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='mx-auto w-full max-w-sm items-center justify-center gap-4 space-y-4 sm:flex sm:max-w-md sm:space-y-0 md:max-w-lg lg:max-w-xl'
    >
      <div className='relative w-full rounded-md sm:max-w-xs'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Mail className='text-muted-foreground h-4 w-4' />
        </div>
        <Input
          {...form.register("email")}
          type='email'
          placeholder='Enter your email'
          className='h-11 pr-4 pl-10 transition-colors focus:border-blue-500 focus:outline-none focus-visible:ring-0'
        />
        <BorderBeam
          duration={6}
          size={600}
          className='from-transparent via-[#a48965] to-transparent'
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={600}
          className='from-transparent via-amber-600 to-transparent'
        />
      </div>
      <Button
        type='submit'
        variant='outline'
        className='h-11 border-[#a48965] bg-[#f6e6cf62] px-8 whitespace-nowrap'
      >
        Get Started
        <ArrowRight className='ml-2 h-4 w-4' />
      </Button>
    </form>
  );
}
