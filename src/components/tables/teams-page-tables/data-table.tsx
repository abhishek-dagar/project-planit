"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { LayoutGrid, List, Pin, PinOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { updateTeam } from "@/lib/actions/team.action";
import useTeams from "@/components/custom-hooks/teams";

interface DataTableProps<TData, TValue, icon> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  icon?: icon;
}

export function DataTable<
  TData extends {
    icon?: string | undefined;
    id?: string | undefined;
    pinned?: boolean;
    link?: string | undefined;
  },
  TValue,
  icon
>({ columns, data, icon }: DataTableProps<TData, TValue, icon>) {
  const teams = useTeams({});
  const [currentTab, setCurrentTab] = useState("box view");

  const dispatch = useDispatch();

  const handleTabToggle = (value: string) => {
    setCurrentTab(value);
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const updatePinned = (id: string | undefined) => {
    teams[0]?.map((team: any) => {
      if (team.id === id) {
        updateTeam({
          ...team,
          pinned: !team.pinned,
        });
        teams[1].updateTeam({ ...team, pinned: !team.pinned });
        return { ...team, pinned: !team.pinned };
      }
      return team;
    });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabToggle}>
      <Table className="border-separate border-spacing-y-3">
        <TableHeader className="shadow-md rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-0 bg-background rounded-lg"
            >
              {currentTab === "list view" ? (
                headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        index > 0
                          ? "hidden md:inline-block w-[200px] pt-1"
                          : " w-[200px]"
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })
              ) : (
                <TableHead>
                  {flexRender(
                    headerGroup.headers[0].column.columnDef.header,
                    headerGroup.headers[0].getContext()
                  )}
                </TableHead>
              )}
              <TableHead className="w-[90px]">
                <TabsList className="bg-secondary-background">
                  <TabsTrigger
                    value="box view"
                    className="data-[state=active]:bg-background"
                  >
                    <LayoutGrid size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="list view"
                    className="data-[state=active]:bg-background"
                  >
                    <List size={18} />
                  </TabsTrigger>
                </TabsList>
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      <TabsContent value="list view">
        {table.getRowModel().rows?.length ? (
          <div className="flex flex-col gap-4 flex-wrap">
            {table.getRowModel().rows.map((row) => {
              return (
                <div
                  key={row.id}
                  className="relative scale-[0.99] transition-all hover:scale-100 focus:scale-100"
                >
                  <Link
                    href={`/app/teams/${row.original.link}`}
                    data-state={row.getIsSelected() && "selected"}
                    className=" relative w-full flex gap-2 bg-background rounded-lg border-[1px] hover:border-primary cursor-pointer shadow-sm hover:shadow-md py-3 px-5"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <div
                        key={cell.id}
                        className={
                          index > 0 ? "hidden md:inline w-[180px]" : "w-[180px]"
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ))}
                  </Link>
                  <div className="w-[90px]">
                    {row.original.pinned ? (
                      <PinOff
                        size={20}
                        onClick={() => updatePinned(row.original.id)}
                        className="absolute cursor-pointer top-3 right-3 h-4 text-slate-400 hover:text-white"
                      />
                    ) : (
                      <Pin
                        size={20}
                        onClick={() => updatePinned(row.original.id)}
                        className="absolute cursor-pointer top-3 right-3 h-4 text-slate-400 hover:text-white"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="h-24 text-center">No results.</div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="box view">
        {table.getRowModel().rows?.length ? (
          // <div className="flex pl-1 gap-6 justify-start flex-wrap select-none">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 select-none">
            {table.getRowModel().rows.map((row) => {
              return (
                <div
                  key={row.id}
                  className="relative scale-[0.98] transition-all hover:scale-100 focus:scale-100 w-[100%] xs:w-auto"
                >
                  <Link
                    href={`/app/teams/${row.original.link}`}
                    data-state={row.getIsSelected() && "selected"}
                    className="md:h-[180px] border-[1px] hover:border-primary bg-background flex flex-col items-start rounded-xl shadow-md"
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <div
                          key={cell.id}
                          className={
                            "p-3 w-full " +
                            (index > 0
                              ? "text-[12px] md:text-[14px] py-1 opacity-50 "
                              : "text-[12px] md:text-[16px] font-bold border-b-[1px] hover:border-primary flex items-center p-3 ") +
                            (row.original.icon && row.original.icon !== ""
                              ? "gap-0"
                              : "gap-2")
                          }
                        >
                          {index > 0 ? (
                            <p>{cell.column.id} :</p>
                          ) : (
                            <>
                              {icon}
                              <p>{row.original.icon}</p>
                            </>
                          )}
                          <p className="mr-4 truncate">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </Link>
                  {row.original.pinned === undefined ? (
                    <></>
                  ) : row.original.pinned ? (
                    <PinOff
                      size={20}
                      onClick={() => updatePinned(row.original.id)}
                      className="absolute cursor-pointer top-5 right-1 h-4 text-slate-400 hover:text-primary"
                    />
                  ) : (
                    <Pin
                      size={20}
                      onClick={() => updatePinned(row.original.id)}
                      className="absolute cursor-pointer top-5 right-1 h-4 text-slate-400 hover:text-primary"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="h-24 text-center">No results.</div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
