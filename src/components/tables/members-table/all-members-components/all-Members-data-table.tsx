import useTeams from "@/components/custom-hooks/teams";
import AddMemberToTeamModal from "@/components/modals/add-member-to-team";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { updateTeam as dbUpdateTeam } from "@/lib/actions/team.action";
import { updateMember } from "@/lib/actions/user.actions";
import {
  ColumnDef,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    // updateData: (rowIndex: number, columId: string, value: unknown) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  team?: any;
}

export function AllMembersTable<TData, TValue>({
  columns,
  data,
  team,
}: DataTableProps<TData, TValue>) {
  const [currentData, setCurrentData] = React.useState<TData[]>(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
    });

  const { toast } = useToast();

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const table = useReactTable({
    data: currentData,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: async (rowIndex, columnId, value) => {},
      addDate: async (newData) => {},
      deleteData: async (rowIndex) => {},
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sticky -top-[33px] z-10 bg-secondary-background">
        <DataTableToolbar table={table} />
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="flex justify-between px-8 py-3 rounded-lg bg-background gap-4"
          >
            {headerGroup.headers.map((header, index) => {
              return (
                <div
                  key={header.id}
                  className={`${index === 1 ? "w-full text-center" : ""}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {table?.getRowModel().rows?.length ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="flex justify-between px-8 border-b-2 border-background items-center pb-2 gap-4"
              >
                {row.getVisibleCells().map((cell: any, index: number) => {
                  return (
                    <div
                      key={cell.id}
                      className={`${index === 1 ? "flex-1 text-center" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        ) : (
          <div>
            <div className="flex justify-between px-8 border-background items-center pb-1">
              No Member found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
