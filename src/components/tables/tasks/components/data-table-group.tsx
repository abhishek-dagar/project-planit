import * as React from "react";
import {} from "@radix-ui/react-icons";
import { Column, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CheckCircle, Flag, Layers, Users } from "lucide-react";

interface DataTableFacetedFilterProps<TData, TValue> {
  table?: Table<TData>;
  title?: string;
  groupBy: string | undefined;
  groupRows: (name?: string) => void;
}

export function DataTableGroup<TData, TValue>({
  table,
  title,
  groupBy,
  groupRows,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const options: {
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[] = [
    { value: "status", icon: CheckCircle },
    { value: "priority", icon: Flag },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Layers className="mr-2 h-4 w-4" />
          {title}
          {groupBy && (
            <div className="hidden space-x-1 lg:flex">
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {groupBy}
              </Badge>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="bg-background">
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === groupBy;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      groupRows(option.value);
                    }}
                    className={`className="data-[selected]:bg-secondary-background" ${
                      isSelected ? "bg-selected" : ""
                    }`}
                  >
                    <div
                      className={`flex w-full h-full items-center capitalize ${
                        isSelected ? "text-primary" : ""
                      }`}
                    >
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      {option.value}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {groupBy && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => groupRows()}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
