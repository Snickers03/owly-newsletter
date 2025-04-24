"use client";

import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toNormalCase } from "@/lib/utils";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
  newsletterTitle?: string;
}

export default function MainLayout({ children, newsletterTitle }: LayoutProps) {
  const pathname = usePathname();

  const relevantPaths = useMemo(() => {
    return pathname.split("/").filter((part) => part && part !== "main");
  }, [pathname]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <section className='border-b'>
        <div className='flex h-14 items-center gap-4 px-4'>
          <SidebarTrigger />
          {relevantPaths.map((part, index) => {
            const isLast = index === relevantPaths.length - 1;
            const href = `/main/${relevantPaths.slice(0, index + 1).join("/")}`;
            const displayName =
              isLast && newsletterTitle ? newsletterTitle : toNormalCase(part);

            return (
              <div key={part} className='flex items-center gap-2'>
                {isLast ? (
                  <span className='text-primary text-sm font-medium'>
                    {newsletterTitle ?? displayName}
                  </span>
                ) : (
                  <>
                    <Link
                      href={href}
                      className='text-muted-foreground text-sm font-medium hover:cursor-pointer hover:underline'
                    >
                      {toNormalCase(part)}
                    </Link>
                    <span>/</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}
