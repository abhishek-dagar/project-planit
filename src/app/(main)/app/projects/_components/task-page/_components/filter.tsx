"use client";

import * as React from "react";
import {
  CalendarIcon,
  ChevronRightIcon,
  ListFilterIcon,
  LucideIcon,
  SignalHighIcon,
  TimerIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TaskPriority,
  TaskPriorityColor,
  TaskPriorityIcon,
  TaskStatus,
  TaskStatusColor,
  TaskStatusIcon,
} from "@/lib/types/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";

interface Props {
  filter: {
    status: string[];
    priority: string[];
    assignee: string[] | null[];
    dueDate: Date | null;
  };
  handleFilter: (key: string, value: any) => void;
}

export function Filter({ filter, handleFilter }: Props) {
  const [open, setOpen] = React.useState(false);
  const url = window.location.href.replace(/&groupBy=[^&]*/g, "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="gap-2 py-0 h-8 text-muted-foreground hover:text-foreground"
        >
          <ListFilterIcon size={16} />
          <p>filter</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="border-b-2">
          <CommandInput placeholder="Filter" isSearchIcon={false} />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className="p-0">
                <StatusDropdown
                  status={filter.status}
                  handleFilter={handleFilter}
                />
              </CommandItem>
              <CommandItem value="priority" className="p-0">
                <PriorityDropdown
                  priority={filter.priority}
                  handleFilter={handleFilter}
                />
              </CommandItem>
              <CommandItem value="dueDate" className="p-0">
                <DueDate dueDate={filter.dueDate} handleFilter={handleFilter} />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const statuses = Object.keys(TaskStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: key,
    label: key,
  }));
const StatusDropdown = ({ status, handleFilter }: any) => {
  const handleUpdateStatus = (value: string) => {
    const index = status.indexOf(value);
    if (index >= 0) {
      status.splice(index, 1);
    } else {
      status.push(value);
    }
    handleFilter("status", status);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-full flex items-center justify-between">
        <p className="flex items-center gap-2 px-3 py-1">
          <TimerIcon size={14} />
          Status
        </p>
        <ChevronRightIcon size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={4} align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((stat) => {
                const Icon: LucideIcon = TaskStatusIcon[stat.value];
                const isChecked = status.indexOf(stat.value) >= 0;
                return (
                  <CommandItem
                    key={stat.value}
                    value={stat.value}
                    onSelect={(currentValue) => {
                      handleUpdateStatus(currentValue);
                    }}
                    className="flex gap-2"
                  >
                    <Checkbox checked={isChecked} />
                    <p className="flex gap-2">
                      <Icon
                        size={16}
                        style={{ color: TaskStatusColor[stat.value] }}
                      />
                      {stat.label}
                    </p>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const PriorityDropdown = ({ priority, handleFilter }: any) => {
  const priorities = Object.keys(TaskPriority)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: key,
      label: key,
    }));
  const handleUpdatePriority = (value: string) => {
    const index = priority.indexOf(value);
    if (index >= 0) {
      priority.splice(index, 1);
    } else {
      priority.push(value);
    }
    handleFilter("priority", priority);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-full flex items-center justify-between">
        <p className="flex items-center gap-2 px-3 py-1">
          <SignalHighIcon size={14} />
          Priority
        </p>
        <ChevronRightIcon size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={4} align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {priorities.map((prior) => {
                const Icon: LucideIcon = TaskPriorityIcon[prior.value];
                const isChecked = priority.indexOf(prior.value) >= 0;
                return (
                  <CommandItem
                    key={prior.value}
                    value={prior.value}
                    onSelect={(currentValue) => {
                      handleUpdatePriority(currentValue);
                    }}
                    className="flex gap-2"
                  >
                    <Checkbox checked={isChecked} />
                    <p className="flex gap-2">
                      <Icon
                        size={16}
                        style={{ color: TaskPriorityColor[prior.value] }}
                      />
                      {prior.label}
                    </p>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DueDate = ({ dueDate, handleFilter }: any) => {
  const handleDueDate = (day: number) => {
    const d: Date = moment().add(day, "days").toDate();
    handleFilter("dueDate", d);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-full flex items-center justify-between">
        <p className="flex items-center gap-2 px-3 py-1">
          <CalendarIcon size={14} />
          Due date
        </p>
        <ChevronRightIcon size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={4} align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Due date in next">
              <CommandItem
                onSelect={() => {
                  handleFilter("dueDate", null);
                }}
                className="flex gap-2"
              >
                <p className="flex gap-2">All</p>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleDueDate(7);
                }}
                className="flex gap-2"
              >
                <p className="flex gap-2">7 days</p>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleDueDate(14);
                }}
                className="flex gap-2"
              >
                <p className="flex gap-2">14 days</p>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleDueDate(30);
                }}
                className="flex gap-2"
              >
                <p className="flex gap-2">30 days</p>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
