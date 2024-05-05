import { ColumnDef, RowData } from "@tanstack/react-table";
import { Member } from "./member-Schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RoleDropdown from "@/components/shared/dropdowns/role-dropdown";
import { DataTableColumnHeader } from "./data-table-column-header";
import MemberSettingDropdown from "@/components/shared/dropdowns/member-setting-dropdown";
import {
  BookTypeIcon,
  MailIcon,
  SettingsIcon,
  UserCogIcon,
} from "lucide-react";

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
      return (
        <div className="flex gap-2 items-center">
          <BookTypeIcon size={18} className="text-muted-foreground" />
          <DataTableColumnHeader column={column} title="Username" />
        </div>
      );
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
        <div className="flex items-center justify-center h-full gap-2">
          <MailIcon size={18} className="text-muted-foreground" />
          Email
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground w-full">
          {row.getValue("email")}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center h-full min-w-[125px] gap-2">
          <UserCogIcon size={18} className="text-muted-foreground" />
          Role
        </div>
      );
    },

    cell: ({ row, column, table }) => {
      const role: string = row.getValue("role");
      const roles = [
        { title: "Member", desc: "Can update only task assigned" },
        { title: "Admin", desc: "Can changes anything" },
      ];
      const updateRole = (value: any) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };
      return <RoleDropdown role={role} handleRole={updateRole} roles={roles} />;
    },
  },
  {
    accessorKey: "settings",
    size: 40,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center h-full">
          <SettingsIcon size={20} />
        </div>
      );
    },

    cell: ({ row, column, table }) => {
      const role: string = row.getValue("role");
      const handleRemoveMember = () => {
        // table.options.meta?.deleteData(row.index);
      };
      return <MemberSettingDropdown handleRemoveMember={handleRemoveMember} />;
    },
  },
];
