"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  GroupingState,
  Row,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataRow } from "./data-row";
import { addNewTask, updateTask } from "@/lib/actions/task.action";
import { useToast } from "@/components/ui/use-toast";
import { MoveIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/components/custom-hooks/user";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    addDate: (data: any) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentData, setCurrentData] = React.useState<TData[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      createdAt: false,
      id: false,
      startDate: false,
    });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [user] = useUser({});

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [columnPinning] = React.useState({
    left: ["select"],
  });

  const { toast } = useToast();

  const table = useReactTable({
    data: currentData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      grouping,
      columnPinning,
    },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    enableGrouping: true,
    onGroupingChange: setGrouping,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      updateData: async (rowIndex, columnId, value) => {
        const newData: any = [...data];
        let newComment: any = { comment: "", from: null, to: null };
        if (columnId === "status") {
          newComment = {
            comment: "Changed Status",
            from: newData[rowIndex][columnId],
            to: value,
          };
        }
        if (columnId === "priority") {
          newComment = {
            comment: "Changed Priority",
            from: newData[rowIndex][columnId],
            to: value,
          };
        }
        if (columnId === "dueDate") {
          newComment = {
            comment: "Changed Due Date",
            from: newData[rowIndex][columnId],
            to: value,
          };
        }
        if (columnId === "dueDate") {
          newComment = {
            comment: "Changed Due Date",
            to: value,
          };
        }
        if (columnId === "assignedTo") {
          newComment = {
            comment: "Task Assigned",
            to: value?.username,
          };
        }
        const comments = [
          ...newData[rowIndex].comments,
          { ...newComment, changedBy: user },
        ];
        newData[rowIndex] = {
          ...newData[rowIndex],
          [columnId]: value,
          comments,
        };
        setCurrentData(newData);
        const response: any = await updateTask({
          ...newData[rowIndex],
        });
        if (columnId === "assignedTo") {
          newData[rowIndex] = { ...newData[rowIndex], [columnId]: value?.id };
        }

        if (response?.success && columnId !== "title") {
          toast({ description: "Task updated successfully" });
        }
      },
      addDate: async (newData) => {
        const addingData = [...currentData];
        addingData.push(newData);
        setCurrentData(addingData);

        delete newData["_id"];
        delete newData["id"];
        newData["projectId"] = projectId;

        const response: any = await addNewTask(newData);
        if (response?.success) {
          toast({ description: "Copy of Task updated successfully" });
        }
      },
    },
  });

  React.useEffect(() => {
    setCurrentData(data);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-4">
      {!loading ? (
        <DataTableToolbar table={table} />
      ) : (
        <div className="w-full flex justify-between gap-2">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 w-[70px]" />
            <Skeleton className="h-8 w-[70px]" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <Skeleton className="h-8 w-[70px]" />
        </div>
      )}
      <div className="">
        {loading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-none bg-secondary-background"
                >
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`[&:has([role=checkbox])]:pl-0 h-8 border-2 relative w-[20px] `}
                        // className={`[&:has([role=checkbox])]:pl-0 h-8 border-2 ${
                        //   index === 0 || index < headerGroup.headers.length - 1
                        //     ? "w-3"
                        //     : ""
                        // }`}
                        style={{
                          width:
                            index > 0 && index < headerGroup.headers.length - 1
                              ? header.getSize()
                              : "",
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {index > 0 &&
                          index < headerGroup.headers.length - 1 &&
                          header.column.getCanResize() && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`absolute right-0 top-0 h-full w-1 bg-muted-foreground cursor-ew-resize select-none touch-none z-10 opacity-0 hover:opacity-100 ${
                                header.column.getIsResizing()
                                  ? "isResizing bg-blue-500 opacity-100"
                                  : ""
                              }`}
                            ></div>
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <DataRow key={row.id} row={row} id={row.id} />
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
