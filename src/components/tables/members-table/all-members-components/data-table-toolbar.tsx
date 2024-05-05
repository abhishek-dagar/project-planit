"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNewUser from "@/components/modals/add-new-user-modal";
import { SearchIcon, UserPlus } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex md:items-center flex-col bg-secondary-background md:flex-row md:justify-between z-10 gap-2">
      <div className="flex flex-wrap md:flex-nowrap flex-1 items-center space-x-2">
        <Input
          placeholder="search by email..."
          frontIcon={<SearchIcon size={16} className="text-muted-foreground" />}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-full md:w-[150px] lg:w-[250px] bg-background"
        />
      </div>
      <div>
        <AddNewUser />
      </div>
    </div>
  );
}
