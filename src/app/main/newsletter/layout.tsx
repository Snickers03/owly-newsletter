"use client";

import type React from "react";
import { useUserStore } from "@/store/user-store";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { AccessDenied } from "@/components/auth/access-denied";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  if (!user) return <AccessDenied />;

  return (
    <SidebarProvider>
      <div className='flex min-h-screen'>
        <AppSidebar />
        <main className='flex-1'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
