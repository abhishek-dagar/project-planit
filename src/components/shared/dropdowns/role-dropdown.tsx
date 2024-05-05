import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  role: string;
  handleRole: (value: any) => void;
  roles: { title: string; desc: string }[];
}

const RoleDropdown = ({ role, handleRole, roles }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 justify-center w-full px-4 py-1 cursor-pointer border-l-4 border-primary rounded-sm bg-background select-none">
            {role}
            {open ? (
              <ChevronDownIcon size={20} />
            ) : (
              <ChevronRightIcon size={20} />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-auto p-0 bg-background border-0"
          align="end"
        >
          <DropdownMenuGroup>
            {roles.map((r, index) => {
              return (
                <div key={index} className="p-1">
                  <DropdownMenuItem
                    onClick={() => handleRole(r.title)}
                    className={`flex flex-col items-start ${
                      r.title.toLowerCase() === role.toLowerCase()
                        ? "bg-secondary-background border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <span>{r.title}</span>
                    <span className="text-[12px] text-muted-foreground">
                      {r.desc}
                    </span>
                  </DropdownMenuItem>
                  {index < 1 && <DropdownMenuSeparator />}
                </div>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RoleDropdown;
