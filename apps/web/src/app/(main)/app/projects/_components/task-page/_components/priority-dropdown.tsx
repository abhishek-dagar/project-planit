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
  TaskPriority,
  TaskPriorityColor,
  TaskPriorityIcon,
  TaskStatusColor,
  TaskStatusIcon,
} from "@/lib/types/task.type";
import { updateTask } from "@/lib/actions/task.action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface Props {
  taskId: string;
  priority: string;
  isIcon?: boolean;
  disabled?: boolean;
}

const priorities = Object.keys(TaskPriority)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: key,
    label: key,
  }));

const PriorityDropdown = ({ taskId, priority, isIcon, disabled }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(priority);
  const Icon: LucideIcon = TaskPriorityIcon[priority];
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = (value: boolean) => {
    if (disabled) {
      toast.error("You are not authorized to perform this action", {
        description: "Only the team lead or manager can change the priority",
      });
      return;
    }
    setOpen(value);
  };

  const handleUpdatePriority = async (priority: string) => {
    try {
      if (priority === value) return;
      setValue(priority === value ? "" : priority);
      const { updatedTask } = await updateTask(taskId, {
        priority: priority,
      });

      if (updatedTask) {
        toast.success("Task updated successfully");
        router.push(getRefresh(searchParams.get("refresh")));
      } else {
        toast.error("Failed to change priority");
      }
    } catch {
      toast.error("Failed to change priority");
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    setValue(priority);
  }, [priority]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size={isIcon ? "icon" : "sm"}
          style={{ color: TaskPriorityColor[priority] }}
          className={cn("h-6 gap-2", isIcon && "w-6")}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon size={16} />
          {!isIcon && value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {priorities.map((prior) => {
                const Icon: LucideIcon = TaskPriorityIcon[prior.value];

                return (
                  <CommandItem
                    key={prior.value}
                    value={prior.value}
                    onSelect={(currentValue) => {
                      handleUpdatePriority(currentValue);
                    }}
                    className="flex justify-between"
                  >
                    <p className="flex gap-2">
                      <Icon
                        size={16}
                        style={{ color: TaskPriorityColor[prior.value] }}
                      />
                      {prior.label}
                    </p>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === prior.value ? "opacity-100" : "opacity-0"
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

export default PriorityDropdown;
