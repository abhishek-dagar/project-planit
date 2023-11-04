import useMembers from "@/components/custom-hooks/members";
import useTeams from "@/components/custom-hooks/teams";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, User, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  assignedTo: any;
  isAvatar?: boolean;
  className?: string;
  updateAssignee: (value: any) => void;
  team?: any;
}

const AssigneeDropdown = ({
  assignedTo,
  updateAssignee,
  isAvatar = false,
  team,
  className = "",
}: Props) => {
  const [assignee, setAssignee] = useState<any>();

  const [_, { fetchMembers }] = useMembers({});

  const members = fetchMembers(team?.members);

  useEffect(() => {
    setAssignee(assignedTo);
  }, [assignedTo]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-center w-full px-4 cursor-pointer [&:hover_.cancel]:visible">
          <div className="w-full flex justify-center">
            {!assignee ? (
              <div
                className={`relative w-[24px] h-[24px] rounded-full border-2 border-muted-foreground border-dashed flex justify-center items-center ${className}`}
              >
                <User size={14} className="text-muted-foreground" />
                <div className="absolute -bottom-1 -right-1 bg-muted-foreground w-3 h-3 rounded-full flex justify-center items-center">
                  <Plus size={9} />
                </div>
              </div>
            ) : isAvatar ? (
              <Avatar>
                <AvatarFallback>{assignee.username[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex gap-1 items-center">
                <Button
                  className="cancel invisible p-0 bg-primary rounded-full h-[12px] w-[12px] flex justify-center items-center"
                  onClick={() => {
                    setAssignee(null);
                    updateAssignee(null);
                  }}
                >
                  <XIcon size={10} />
                </Button>
                <span className="font-light text-[14px]">
                  {assignee.username}
                </span>
              </div>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={"Member"} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="py-2 px-4 font-normal">
              {members &&
                members.map((member: any) => {
                  return (
                    <CommandItem
                      key={member.id}
                      className="flex gap-2"
                      onSelect={() => {
                        setAssignee(member);
                        updateAssignee(member);
                      }}
                    >
                      <Avatar>
                        <AvatarFallback className="capitalize">
                          {member?.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.username}</span>
                    </CommandItem>
                  );
                })}
              {assignee && (
                <>
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => {
                      setAssignee(null);
                      updateAssignee(null);
                    }}
                  >
                    <span>Remove Assignee</span>
                  </CommandItem>
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssigneeDropdown;
