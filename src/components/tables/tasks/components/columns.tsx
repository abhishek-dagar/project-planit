"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  TaskPriorityColor,
  TaskStatusColor,
} from "@/lib/interfacesOrEnum/teams-group";
import StatusDropdown from "@/components/shared/dropdowns/status-dropdown";
import PriorityDropdown from "@/components/shared/dropdowns/priority-dropdown";
import {
  Maximize2Icon,
  FileTypeIcon,
  CheckCircleIcon,
  CalendarIcon,
  FlagIcon,
  Users2Icon,
} from "lucide-react";
import DueDateDropdown from "@/components/shared/dropdowns/due-date-dropdown";
import AssigneeDropdown from "@/components/shared/dropdowns/assignee-dropdown";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import EditTask from "@/components/modals/editTask-modal";
import dynamic from "next/dynamic";

const EditTask = dynamic(
  () => import("@/components/modals/edit-task-modal/editTask-modal")
);

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {}
}

export const columns: ColumnDef<Task>[] = [
  // id
  {
    accessorKey: "id",
    enableHiding: false,
  },
  // newTaskSide
  {
    accessorKey: "newTaskSide",
    enableHiding: false,
  },
  // check box
  {
    id: "select",
    header: ({ table }) => (
      <div
        className={`hidden w-full md:flex justify-center mb-1 ${
          table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
            ? "[&_.checkbox]:block [&_.heading]:hidden"
            : "[&_.checkbox]:hidden [&:hover_.checkbox]:block [&_.heading]:block [&:hover_.heading]:hidden"
        }`}
      >
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px] checkbox border-2 bg-secondary-background mx-2"
        />
        <span className="heading w-1 mx-4">#</span>
      </div>
    ),
    size: 35,
    cell: ({ row }) => {
      return (
        <div
          className={`hidden w-full md:flex justify-center mb-1 ${
            row.getIsSelected()
              ? "[&_.checkbox]:block [&_.serial-number]:hidden"
              : "[&_.checkbox]:hidden [&_.serial-number]:block"
          }`}
        >
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px] checkbox border-2 bg-secondary-background mx-2"
          />
          <span className="serial-number w-1 mx-4">{row.index + 1}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // title
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Title"
          className="w-full"
          hide={false}
          Icon={FileTypeIcon}
        />
      );
    },
    cell: ({ row, table }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2 w-full justify-between items-center h-full">
          <div className="flex space-x-2 w-full">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <span className="truncate font-medium cursor-pointer text-[14px] pl-2">
              {row.getValue("title")}
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="maximize p-1.5 bg-secondary-background invisible rounded-md">
                <Maximize2Icon size={14} />
              </div>
            </DialogTrigger>
            <DialogContent
              className="h-[90%] max-w-[90vw] p-0"
              closeBtn={false}
            >
              <EditTask task={row.original} table={table} row={row} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    enableHiding: false,
  },
  // status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return column.getIsGrouped() ? (
        <DataTableColumnHeader
          column={column}
          title="Status"
          className="w-full justify-start"
          Icon={CheckCircleIcon}
        />
      ) : (
        <DataTableColumnHeader
          column={column}
          title="Status"
          className="w-full justify-center"
          Icon={CheckCircleIcon}
        />
      );
    },
    size: 50,
    cell: ({ row, column, table }) => {
      type TaskStatusColorStrings = keyof typeof TaskStatusColor;
      const currStatus: TaskStatusColorStrings = row.getValue("status");

      const status = statuses.find(
        (status) => status.value.toUpperCase() === row.getValue("status")
      );

      const taskColor = TaskStatusColor[currStatus];

      if (!status) {
        return null;
      }
      const handleChangeStatus = (value: unknown) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };

      return (
        <div className="flex w-full items-center h-8 px-2">
          {row.getIsGrouped() ? (
            <div
              className="px-2 py-1 rounded-lg"
              style={{ backgroundColor: taskColor }}
            >
              {row.getValue("status")}
            </div>
          ) : (
            <StatusDropdown
              color={taskColor}
              label={status.label}
              Icon={status.icon}
              handleChangeStatus={handleChangeStatus}
            />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // assigned to
  {
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assignee"
        className="w-full justify-center"
        Icon={Users2Icon}
      />
    ),
    size: 50,
    cell: ({ row, table, column }) => {
      const updateAssignee = (value: any) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };
      return (
        <AssigneeDropdown
          assignedTo={row.getValue("assignedTo")}
          updateAssignee={updateAssignee}
        />
      );
    },
  },
  // createdAt
  {
    accessorKey: "createdAt",
    header: () => <></>,
    cell: () => <></>,
    enableHiding: false,
  },
  // startDate
  {
    accessorKey: "startDate",
    header: () => <></>,
    cell: () => <></>,
    enableHiding: false,
  },
  // dueDate
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DueDate"
        className="w-full justify-center"
        Icon={CalendarIcon}
      />
    ),
    size: 50,
    cell: ({ row, column, table }) => {
      const handleDueDate = (value: unknown) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };
      return (
        <div className="w-full flex justify-center">
          {/* <CalendarDays size={16} /> */}
          <DueDateDropdown
            startDate={row.getValue("startDate")}
            dueDate={row.getValue("dueDate")}
            handleDueDate={handleDueDate}
          />
        </div>
      );
    },
  },
  // priority
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Priority"
        className="w-full justify-center"
        Icon={FlagIcon}
      />
    ),
    size: 50,
    cell: ({ row, column, table }) => {
      const priority = priorities.find(
        (priority) => priority.value.toUpperCase() === row.getValue("priority")
      );
      type TaskPriorityColorStrings = keyof typeof TaskPriorityColor;
      const currPriority: TaskPriorityColorStrings = row.getValue("priority");

      const priorityColor = TaskPriorityColor[currPriority];

      if (!priority) {
        return null;
      }

      const handleChangePriority = (value: unknown) => {
        table.options.meta?.updateData(row.index, column.id, value);
      };

      return (
        <div className="flex items-center h-8 px-2">
          {row.getIsGrouped() ? (
            <div
              className="px-2 py-1 rounded-lg"
              style={{ backgroundColor: priorityColor }}
            >
              {row.getValue("priority")}
            </div>
          ) : (
            <PriorityDropdown
              color={priorityColor}
              value={currPriority}
              Icon={priority.icon}
              label={currPriority}
              handleChangePriority={handleChangePriority}
            />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // actions
  {
    id: "actions",
    size: 20,
    cell: ({ row, table }) => {
      const handleCopy = () => {
        const copyTask = { ...row.original };
        copyTask.title += " copy";
        table.options.meta?.addDate(copyTask);
      };
      return (
        <DataTableRowActions row={row} handleCopy={handleCopy} table={table} />
      );
    },
  },
];
