"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Table } from "@tanstack/react-table";

import { labels } from "../data/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditTask from "@/components/modals/edit-task-modal/editTask-modal";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table?: Table<TData>;
  handleCopy: () => void;
  handleDelete: () => void;
}

export function DataTableRowActions<TData>({
  row,
  handleCopy,
  handleDelete,
  table,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-full p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px] bg-background [&:has([role=menuitem])]:cursor-pointer drop-shadow-lg"
        >
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setOpen(false);
              }}
            >
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleCopy}>Make a copy</DropdownMenuItem>
          {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="h-[90%] max-w-[90vw] p-0" closeBtn={false}>
        <EditTask task={row.original} table={table} row={row} />
      </DialogContent>
    </Dialog>
  );
}
