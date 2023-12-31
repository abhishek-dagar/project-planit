import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateMember } from "@/lib/actions/user.actions";
import {
  ColumnDef,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    // updateData: (rowIndex: number, columId: string, value: unknown) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MemberTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [currentData, setCurrentData] = React.useState<TData[]>(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
    });

  const { toast } = useToast();

  const table = useReactTable({
    data: currentData,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: async (rowIndex, columnId, value) => {
        const copyData: any = [...currentData];
        const newData: any = [...currentData];
        newData[rowIndex] = {
          ...newData[rowIndex],
          [columnId]: value,
        };
        setCurrentData(newData);
        const updatedUser = await updateMember({
          ...newData[rowIndex],
          [columnId]: value,
        });
        if (updatedUser.response) {
          toast({
            description: "Member updated successfully",
          });
        } else {
          toast({
            variant: "destructive",
            description: "Member updation failed",
          });
          setCurrentData(copyData);
        }
      },
      addDate: () => {},
    },
  });
  return (
    <div className="flex flex-col gap-4">
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="flex justify-between px-8 py-3 rounded-lg bg-background"
        >
          {headerGroup.headers.map((header, index) => {
            return (
              <div key={header.id}>
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
      <div className="flex flex-col gap-3">
        {table?.getRowModel().rows?.length ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="flex justify-between px-8 border-b-2 border-background items-center pb-2"
              >
                {row.getVisibleCells().map((cell: any, index: number) => {
                  return (
                    <div key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="flex justify-between px-8 border-b-2 border-background items-center pb-1">
              <Button
                variant={"ghost"}
                className="px-2 py-0 hover:bg-background"
              >
                + New Member
              </Button>
            </div>
          </>
        ) : (
          <div>
            <div className="h-24 w-full text-center">No Members</div>
          </div>
        )}
      </div>
    </div>
  );
}
