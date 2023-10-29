import { priorities, statuses } from "@/components/tables/tasks/data/data";
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
import { TaskPriorityColor } from "@/lib/interfacesOrEnum/teams-group";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";

type TaskPriorityColorStrings = keyof typeof TaskPriorityColor;

const PriorityDropdown = ({
  color,
  Icon,
  label,
  handleChangePriority,
  className,
}: {
  color: string;
  value: TaskPriorityColorStrings;
  Icon?: LucideIcon;
  label?: string;
  className?: string;
  handleChangePriority: (value: unknown) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`w-full flex justify-start `}>
          <div
            className={`flex justify-center items-center p-0.5 px-1 h-full cursor-pointer text-[14px] text-white rounded-md gap-2 ${className}`}
            style={{
              backgroundColor: label ? color : "",
            }}
          >
            {Icon && (
              <Icon
                className="h-4 w-4 text-muted-foreground select-none text-white text-[12px]"
                style={{ color: label ? "white" : color }}
              />
            )}
            {label && (
              <span className="flex-1 font-light uppercase truncate max-w-[calc(100%-10px)]">
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
              {priorities.map(
                (
                  priority: {
                    value: string;
                    label: string;
                    icon?: React.ComponentType<{
                      className?: string;
                      style?: { color?: string };
                    }>;
                  },
                  index: number
                ) => {
                  type TaskPriorityColorStrings =
                    keyof typeof TaskPriorityColor;
                  const currPriority: TaskPriorityColorStrings =
                    priority.value.toUpperCase();
                  const currColor = TaskPriorityColor[currPriority];

                  return (
                    <div
                      key={priority.value}
                      className="flex flex-col gap-0 pt-0"
                    >
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          handleChangePriority(currPriority);
                        }}
                        className="text-[14px] rounded-none aria-selected:bg-secondary-background"
                      >
                        {priority.icon && (
                          <priority.icon
                            className="mr-2 h-4 w-4 text-muted-foreground"
                            style={{ color: `${currColor}` }}
                          />
                        )}
                        <span
                        // className={`text-[${currColor}]`}
                        // style={{ color: `${currColor}` }}
                        >
                          {priority.label}
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

export default PriorityDropdown;
