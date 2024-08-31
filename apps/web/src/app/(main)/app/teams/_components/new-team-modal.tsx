"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/components/custom-hooks/media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamForm } from "./team-form";

export function CreateNewTeamModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Create a new team and invite your team members
            </DialogDescription>
          </DialogHeader>
          <TeamForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"} className="text-xs py-0 h-7">
          Create Team
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <TeamForm setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
