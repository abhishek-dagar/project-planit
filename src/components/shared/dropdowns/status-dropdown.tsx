import { statuses } from "@/components/tables/tasks/data/data";
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
import { TaskStatusColor } from "@/lib/interfacesOrEnum/teams-group";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";

const StatusDropdown = ({
  color,
  label,
  Icon,
  className,
  handleChangeStatus,
}: {
  color: string;
  label: string | undefined;
  Icon?: LucideIcon;
  className?: string;
  handleChangeStatus: (value: unknown) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`w-full flex justify-start `}>
          <div
            className={`flex justify-center items-center p-0.5 px-1 h-full cursor-pointer text-[14px] text-white rounded-md gap-2 ${
              className ? className : ""
            }`}
            style={{
              backgroundColor: color,
            }}
          >
            {Icon && (
              <Icon className="h-4 w-4 text-muted-foreground select-none text-white text-[12px]" />
            )}
            {label && (
              <span
                className={`flex-1 font-light uppercase truncate ${
                  Icon ? "max-w-[calc(100%-10px)]" : ""
                }`}
              >
                {label}
              </span>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="bg-background">
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="p-0 font-normal">
              {statuses.map(
                (
                  status: {
                    value: string;
                    label: string;
                    icon?: React.ComponentType<{
                      className?: string;
                      style?: { color?: string };
                    }>;
                  },
                  index: number
                ) => {
                  type TaskStatusColorStrings = keyof typeof TaskStatusColor;
                  const currStatus: TaskStatusColorStrings =
                    status.value.toUpperCase() as TaskStatusColorStrings;
                  const currColor = TaskStatusColor[currStatus];

                  return (
                    <div
                      key={status.value}
                      className="flex flex-col gap-0 pt-0"
                    >
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          handleChangeStatus(currStatus);
                        }}
                        className="text-[14px] rounded-none aria-selected:bg-secondary-background"
                      >
                        {status.icon && (
                          <status.icon
                            className="mr-2 h-4 w-4 text-muted-foreground"
                            style={{ color: `${currColor}` }}
                          />
                        )}
                        <span
                        // className={`text-[${currColor}]`}
                        // style={{ color: `${currColor}` }}
                        >
                          {status.label}
                        </span>
                      </CommandItem>
                      {index < statuses.length - 1 && <CommandSeparator />}
                    </div>
                  );
                }
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusDropdown;
