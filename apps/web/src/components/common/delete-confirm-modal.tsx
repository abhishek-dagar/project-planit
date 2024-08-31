"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  onConfirm: () => Promise<
    | { success: string; err?: undefined }
    | { err: any; success?: undefined }
    | undefined
  > | void;
  redirectTo?: string;
}

const DeleteConfirmModal = ({ onConfirm, redirectTo }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleConfirm = async () => {
    const { success, err }: any = await onConfirm();
    if (success) {
      toast.success(success);
    }
    if (err) {
      toast.error(err);
    }
    setOpen(false);
    if (redirectTo) {
      router.refresh();
      setTimeout(() => {
        router.push(redirectTo);
      }, 500);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-destructive hover:bg-destructive py-0 h-8"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-destructive bg-destructive/10 backdrop-blur-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and can
            never be restored.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              onClick={handleConfirm}
              className="border-destructive bg-destructive/70 hover:bg-destructive py-0 focus-visible:ring-destructive"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;
