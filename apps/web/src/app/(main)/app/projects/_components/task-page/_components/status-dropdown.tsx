import {
  Calculator,
  Calendar,
  Check,
  CreditCard,
  LucideIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TaskStatus,
  TaskStatusColor,
  TaskStatusIcon,
} from "@/lib/types/task.type";
import { updateTask } from "@/lib/actions/task.action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface Props {
  taskId: string;
  status: string;
  isIcon?: boolean;
  disabled?: boolean;
}

const statuses = Object.keys(TaskStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: key,
    label: key,
  }));

const StatusDropdown = ({ taskId, status, isIcon, disabled }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(status);
  const Icon: LucideIcon = TaskStatusIcon[status];
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = (value: boolean) => {
    if (disabled) {
      toast.error("You are not authorized to perform this action", {
        description: "Only the team lead or manager can change the status",
      });
      return;
    }
    setOpen(value);
  };

  const handleUpdateStatus = async (status: string) => {
    try {
      if (status === value) return;
      setValue(status === value ? "" : status);
      const { updatedTask } = await updateTask(taskId, {
        status: status,
      });

      if (updatedTask) {
        toast.success("Task updated successfully");
        router.push(getRefresh(searchParams.get("refresh")));
      } else {
        toast.error("Failed to change status");
      }
    } catch {
      toast.error("Failed to change status");
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size={isIcon ? "icon" : "sm"}
          style={{ color: TaskStatusColor[status] }}
          className={cn("h-6 gap-2", isIcon && "w-6")}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon size={16} />
          {!isIcon && value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((stat) => {
                const Icon: LucideIcon = TaskStatusIcon[stat.value];
                return (
                  <CommandItem
                    key={stat.value}
                    value={stat.value}
                    onSelect={(currentValue) => {
                      handleUpdateStatus(currentValue);
                    }}
                    className="flex justify-between"
                  >
                    <p className="flex gap-2">
                      <Icon
                        size={16}
                        style={{ color: TaskStatusColor[stat.value] }}
                      />
                      {stat.label}
                    </p>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === stat.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusDropdown;
