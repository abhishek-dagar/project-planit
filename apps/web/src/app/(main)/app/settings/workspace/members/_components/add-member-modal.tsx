import { useMediaQuery } from "@/components/custom-hooks/media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import { AddMemberForm } from "./add-member-form";

interface AddMemberModalProps {
  user: any;
}

const AddMemberModal = ({ user }: AddMemberModalProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member</DialogTitle>
            <DialogDescription>Add member to the workspace</DialogDescription>
          </DialogHeader>
          <AddMemberForm user={user} setOpen={setOpen} />
          {/* <TeamForm setOpen={setOpen} /> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Add member</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="border-t p-4">
          <AddMemberForm user={user} setOpen={setOpen} />
          {/* <TeamForm setOpen={setOpen} /> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddMemberModal;
