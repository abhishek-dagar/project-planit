import { UserCircleIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { updateTask } from "@/lib/actions/task.action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRefresh } from "@/lib/helpers/getRefersh";
import { currentUser } from "@/lib/helpers/getTokenData";
import UserAvatar from "@/components/common/user-avatar";

interface Props {
  taskId: string;
  assignee: any;
  team?: any;
  isIcon?: boolean;
  disabled?: boolean;
}
const AssigneeDropdown = ({
  taskId,
  assignee,
  team,
  isIcon,
  disabled,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>();
  const [members, setMembers] = useState<any>();
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = (value: boolean) => {
    if (disabled) {
      toast.error("You are not authorized to perform this action", {
        description: "Only the team lead or manager can assign task",
      });
      return;
    }
    setOpen(value);
  };

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
    const getUser = async () => {
      const user = await currentUser();
      if (team?.members) {
        setMembers([user, ...team?.members]);
      } else {
        setMembers([user]);
      }
      setUser(user);
    };
    getUser();
  }, [searchParams.get("projectId")]);
  useEffect(() => {
    setValue(assignee);
  }, [assignee, team?.members]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
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
                    className="flex items-center gap-2"
                  >
                    {/* <Avatar className="h-6 w-6">
                      <AvatarFallback className="uppercase">
                        {member.name === user?.name ? "M" : member.name[0]}
                      </AvatarFallback>
                    </Avatar> */}
                    <UserAvatar text={member.name === user?.name ? "M" : member.name[0]} id={member.id} isSmall/>
                    <p className="flex gap-2 truncate">
                      {member.name === user?.name ? "Me" : member.name}
                    </p>
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
