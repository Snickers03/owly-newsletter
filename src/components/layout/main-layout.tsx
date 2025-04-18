"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toNormalCase } from "@/lib/utils";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const relevantPaths = pathParts.filter(
    (part) => part !== "" && part !== "main",
  );

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <section className='border-b'>
        <div className='flex h-14 items-center gap-4 px-4'>
          <SidebarTrigger />
          {relevantPaths.map((part, index) => {
            const isLastPart = index === relevantPaths.length - 1;
            const href = `/main/${relevantPaths.slice(0, index + 1).join("/")}`;
            return (
              <div key={part} className='flex items-center gap-2'>
                {isLastPart ? (
                  <span className='text-primary text-sm font-medium'>
                    {toNormalCase(part)}
                  </span>
                ) : (
                  <>
                    <Link
                      href={href}
                      className='text-muted-foreground text-sm font-medium hover:cursor-pointer hover:underline'
                    >
                      {part
                        .replace(/-/g, " ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
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
