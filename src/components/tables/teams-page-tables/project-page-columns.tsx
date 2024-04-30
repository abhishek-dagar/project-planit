"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  teamId: string;
  name?: string | undefined;
  projectName: string;
  createdAt: string;
  updatedAt: string;
  link: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      const sortType = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {sortType === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : sortType === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownUp size={14}/>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const sortType = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          {sortType === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : sortType === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownUp size={14}/>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      const sortType = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          {sortType === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : sortType === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownUp size={14}/>
          )}
        </Button>
      );
    },
  },
];
