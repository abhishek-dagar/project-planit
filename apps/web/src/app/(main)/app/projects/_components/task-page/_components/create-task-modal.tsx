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
import { TaskForm } from "./create-task-form";
// import { TeamForm } from "./team-form";

export function CreateTaskModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Create task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
            <DialogDescription>Create a new task</DialogDescription>
          </DialogHeader>
          <TaskForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Create Task</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="border-t p-4">
          <TaskForm setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
