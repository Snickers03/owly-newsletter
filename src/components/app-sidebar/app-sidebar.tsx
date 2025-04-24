"use client";

import { APP_MAIN_PAGE } from "@/config";
import { Newspaper } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { AuthHeader } from "../auth/layout/auth-header";
import { AppSidebarUser } from "./app-sidebar-user/app-sidebar-user";

const navigationItems = [
  {
    title: "Newsletters",
    icon: Newspaper,
    href: APP_MAIN_PAGE,
    isActive: true,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='items-start border-b px-4 py-4'>
        <AuthHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.href}>
                      <item.icon className='h-4 w-4' />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='border-t'>
        <AppSidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
