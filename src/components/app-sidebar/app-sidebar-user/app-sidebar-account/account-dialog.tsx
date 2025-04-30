"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExtendedUser } from "@/store/user-store";
import { Shield, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/app/_trpc/client";

import { DeleteAccountDialog } from "./account-delete-dialog";
import { AccountProfileTab } from "./app-sidebar-account-tabs/account-profile-tab";
import { SecurityTab } from "./app-sidebar-account-tabs/account-security-tab";

interface AccountSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ExtendedUser;
}

export function AccountSettingsDialog({
  open,
  onOpenChange,
  user,
}: AccountSettingsDialogProps) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const router = useRouter();
  const { mutate: deleteAccount } = trpc.user.delete.useMutation({
    onSuccess: () => {
      setDeleteConfirmationOpen(false);
      onOpenChange(false);
      router.push("/");
    },
    onError: () => {
      // Handle error during account deletion
    },
  });

  const handleDeleteAccount = () => {
    deleteAccount(user.id);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogDescription>
              Update your account information and preferences.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue='profile' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='profile'>
                <div className='flex items-center gap-1'>
                  <User className='h-4 w-4' />
                  <span>Profile</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value='security'>
                <div className='flex items-center gap-1'>
                  <Shield className='h-4 w-4' />
                  <span>Security</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value='profile'>
              <AccountProfileTab
                user={user}
                closeDialog={() => onOpenChange(false)}
              />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value='security'>
              <SecurityTab
                onDeleteAccount={() => setDeleteConfirmationOpen(true)}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <DeleteAccountDialog
        open={deleteConfirmationOpen}
        onOpenChange={setDeleteConfirmationOpen}
        onConfirmDelete={handleDeleteAccount}
      />
    </>
  );
}
