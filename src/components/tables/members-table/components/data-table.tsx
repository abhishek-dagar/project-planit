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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    // updateData: (rowIndex: number, columId: string, value: unknown) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  team: any;
}

export function MemberTable<TData, TValue>({
  columns,
  data,
  team,
}: DataTableProps<TData, TValue>) {
  const [currentData, setCurrentData] = React.useState<TData[]>(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
    });

  const { toast } = useToast();
  const [_, { updateTeam }] = useTeams({});

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
      addDate: async (newData) => {
        const addingData = [...currentData, ...newData];
        setCurrentData(addingData);

        const updatedTeam = JSON.parse(JSON.stringify(team));
        if (updatedTeam.members) {
          updatedTeam.members = [...updatedTeam.members, ...newData];
        } else {
          updatedTeam.members = [...newData];
        }

        const te: any = await dbUpdateTeam(updatedTeam);
        if (te?.success) {
          updateTeam(updateMember);
        }
        // delete newData["_id"];
        // delete newData["id"];
        // newData["projectId"] = projectId;
      },
      deleteData: async (rowIndex) => {
        const newData = [...currentData];
        const deleteData: any = newData[rowIndex];
        newData.splice(rowIndex, 1);
        setCurrentData(newData);
        const updatedTeam = JSON.parse(JSON.stringify(team));
        if (updatedTeam.members) {
          updatedTeam.members = updatedTeam.members.filter(
            (member: any) => member.id !== deleteData.id
          );
        }
        const te: any = await dbUpdateTeam(updatedTeam);
        if (te?.success) {
          updateTeam(updateMember);
        }
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
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
                <DialogTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="px-2 py-0 hover:bg-background"
                  >
                    + New Member
                  </Button>
                </DialogTrigger>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between px-8 border-b-2 border-background items-center pb-1">
                <DialogTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="px-2 py-0 hover:bg-background"
                  >
                    + New Member
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          )}
        </div>
        <DialogContent>
          <AddMemberToTeamModal team={team} table={table} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
