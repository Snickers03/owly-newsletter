"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirmDelete,
}: DeleteAccountDialogProps) {
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleDelete = () => {
    onConfirmDelete();
    setDeleteConfirmText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-red-600'>
            <AlertTriangle className='h-5 w-5' />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <Alert variant='destructive'>
            <AlertTriangle className='h-4 w-4' />
            <AlertDescription>
              All of your data will be permanently removed. This action cannot
              be undone.
            </AlertDescription>
          </Alert>

          <div className='space-y-2'>
            <Label htmlFor='confirm-delete'>
              Please type <span className='font-semibold'>DELETE</span> to
              confirm
            </Label>
            <Input
              id='confirm-delete'
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder='DELETE'
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteConfirmText !== "DELETE"}
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
