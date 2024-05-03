"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableGroup } from "./data-table-group";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [groupBy, setGroupBy] = useState<string>();

  const groupRows = (name?: string) => {
    if (groupBy) {
      table?.getColumn(groupBy)?.toggleGrouping();
      setGroupBy(undefined);
    }
    if (name) {
      table?.getColumn(name)?.toggleGrouping();
      setGroupBy(name);
    }
  };

  return (
    <div className="flex md:items-center flex-col bg-secondary-background md:flex-row md:justify-between sticky top-0 z-10 gap-2">
      <div className="flex flex-wrap md:flex-nowrap flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[150px] lg:w-[250px] bg-background"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        <DataTableGroup
          table={table}
          title="Group By"
          groupBy={groupBy}
          groupRows={groupRows}
        />
        {(isFiltered || groupBy) && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              groupRows();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
