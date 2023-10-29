"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex bg-secondary-background md:bg-background"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="capitalize cursor-pointer hover:bg-background"
              >
                <div className="w-full flex justify-between">
                  {column.id}
                  <Switch
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  />
                </div>
              </DropdownMenuItem>
              // <DropdownMenuCheckboxItem
              //   key={column.id}
              //   className="capitalize cursor-pointer hover:bg-background"
              //   checked={column.getIsVisible()}
              //   onCheckedChange={(value) =>
              //     index > 0 && column.toggleVisibility(!!value)
              //   }
              // >
              //   {column.id}
              // </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
