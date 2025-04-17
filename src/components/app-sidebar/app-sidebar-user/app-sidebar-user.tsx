"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { ChevronUp, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AccountSettingsDialog } from "./app-sidebar-account/account-dialog";

export const AppSidebarUser = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const openSettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='hover:bg-sidebar-accent flex w-full items-center gap-2 rounded-md p-2 outline-none'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
              <AvatarFallback className='text-lg'>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 text-left'>
              <p className='text-sm font-medium'>{user?.name}</p>
              <p className='text-xs text-gray-500'>{user?.email}</p>
            </div>
            <ChevronUp className='h-4 w-4 text-gray-500' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuItem onClick={openSettingsDialog}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-500'
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut className='mr-2 h-4 w-4 text-red-500' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountSettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        user={user}
      />
    </>
  );
};
