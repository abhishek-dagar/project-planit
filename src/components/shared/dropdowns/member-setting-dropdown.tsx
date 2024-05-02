import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CrossIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";

const roles = [
  { title: "member", desc: "Can update only task assigned" },
  { title: "TeamLead", desc: "Can update only this team tasks" },
];

interface Props {
  handleRemoveMember: () => void;
}

const MemberSettingDropdown = ({ handleRemoveMember }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="text-muted-foreground cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-auto p-0 bg-background border-0"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => handleRemoveMember()}
              className={`flex gap-2 items-start m-1 mx-2 cursor-pointer`}
            >
              <XIcon className="text-[#fd71af]" />
              <span>Remove from team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberSettingDropdown;
