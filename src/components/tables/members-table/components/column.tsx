import { ColumnDef, RowData } from "@tanstack/react-table";
import { Member } from "./member-Schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RoleDropdown from "@/components/shared/dropdowns/role-dropdown";
import { DataTableColumnHeader } from "./data-table-column-header";

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {}
}

export const columns: ColumnDef<Member>[] = [
  // id
  {
    accessorKey: "id",
  },
  // username
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Username" />;
    },
    cell: ({ row }) => {
      const username: string = row.getValue("username");
      return (
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarFallback className="bg-background">
              {username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{row.getValue("username")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center h-full">Email</div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">{row.getValue("email")}</span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center h-full">Role</div>
      );
    },

    cell: ({ row, column, table }) => {
      const role: string = row.getValue("role");
      const updateRole = (value: any) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };
      return <RoleDropdown role={role} handleRole={updateRole} />;
    },
  },
];
