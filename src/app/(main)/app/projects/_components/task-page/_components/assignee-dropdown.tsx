import {
  Calculator,
  Calendar,
  Check,
  CreditCard,
  LucideIcon,
  Settings,
  Smile,
  User,
  UserCircleIcon,
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
import React, { useEffect, useState } from "react";
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
import { fetchProject } from "@/lib/actions/project.action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface Props {
  taskId: string;
  assignee: any;
  team?: any;
  isIcon?: boolean;
}
const AssigneeDropdown = ({ taskId, assignee, team, isIcon }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>();
  const [members, setMembers] = useState<any>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdateAssignee = async (
    assigneeId: string | null,
    assigneeName?: string
  ) => {
    try {
      if (assigneeId === value?.id) return;
      //   setValue(assigneeId === value?.id ? value : assigneeId);
      const { updatedTask } = await updateTask(
        taskId,
        {
          assigneeId: assigneeId,
        },
        assigneeName
      );

      if (updatedTask) {
        toast.success("Task updated successfully");
        router.push(getRefresh(searchParams.get("refresh")));
      } else {
        toast.error("Failed to change assignee1");
      }
    } catch (error: any) {
      console.log(error.message);

      toast.error("Failed to change assignee");
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    setMembers(team?.members);
  }, [searchParams.get("projectId")]);
  useEffect(() => {
    setValue(assignee);
  }, [assignee]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size={isIcon ? "icon" : "sm"}
          className={cn("h-6 gap-2", isIcon && "w-6")}
          onClick={(e) => e.stopPropagation()}
        >
          {!value ? (
            <div className="flex gap-2 items-center">
              <UserCircleIcon size={16} />
              {!isIcon && "Unassigned"}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="uppercase">
                  {value?.name[0]}
                </AvatarFallback>
              </Avatar>
              {!isIcon && value?.name}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command
          filter={(value, search, keywords: any) => {
            const tempValue = members?.find(
              (member: any) => member.id === value
            );
            const extendValue = tempValue?.name + " " + keywords.join(" ");
            if (value.includes(search) || extendValue.includes(search))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {members && members?.length > 0 && (
                <CommandItem
                  value={undefined}
                  onSelect={() => {
                    handleUpdateAssignee(null);
                  }}
                  className="flex justify-between"
                >
                  <p className="flex gap-2">No members</p>
                </CommandItem>
              )}
              {members?.map((member: any) => {
                return (
                  <CommandItem
                    key={member.id}
                    value={member.id}
                    onSelect={(currentValue: any) => {
                      handleUpdateAssignee(currentValue, member.name);
                    }}
                    className="flex justify-between"
                  >
                    <p className="flex gap-2">{member.name}</p>
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

export default AssigneeDropdown;
