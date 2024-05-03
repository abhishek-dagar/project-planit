"use client";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status, StatusColor } from "@/lib/interfacesOrEnum/teams-group";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HelpCircleIcon,
  LoaderIcon,
  LucideIcon,
  OrbitIcon,
  PauseIcon,
  XCircleIcon,
} from "lucide-react";
import React, { useState } from "react";

const projectStatus: { title: string; icon: LucideIcon }[] = [];
const icons = [
  OrbitIcon,
  LoaderIcon,
  PauseIcon,
  HelpCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
];

Object.keys(Status).map((status, index) => {
  projectStatus.push({
    title: status,
    icon: icons[index],
  });
});

interface Props {
  status: string;
  isLoading: boolean;
  handleProjectStatus: (status: string) => void;
}

type StatusColorStrings = keyof typeof StatusColor;
type StatusStrings = keyof typeof Status;

const ProjectStatusDropdown = ({
  status,
  isLoading,
  handleProjectStatus,
}: Props) => {
  const [open, setOpen] = useState(false);
  const statusColor: StatusColorStrings =
    status.toUpperCase() as StatusColorStrings;
  const Icon: LucideIcon | undefined = projectStatus.find(
    (r) => r.title.toLowerCase() === status.toLowerCase()
  )?.icon;
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild disabled={isLoading}>
          <div
            className={`flex items-center gap-1 justify-center w-full px-4 py-1 pl-2 cursor-pointer border-l-4 border-[${StatusColor[statusColor]}] rounded-sm bg-background select-none`}
            style={{ borderColor: StatusColor[statusColor] }}
          >
            {Icon && !isLoading ? (
              <Icon
                size={18}
                color={StatusColor[statusColor]}
                className="mr-2"
              />
            ) : (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </>
            )}
            <p className={`${isLoading && "text-muted-foreground"}`}>
              {status}
            </p>
            {open ? (
              <ChevronDownIcon
                size={20}
                className={`${isLoading && "text-muted-foreground"}`}
              />
            ) : (
              <ChevronRightIcon
                size={20}
                className={`${isLoading && "text-muted-foreground"}`}
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-auto p-0 bg-background border-0"
          align="end"
        >
          <DropdownMenuGroup>
            {projectStatus.map((r, index) => {
              const statusColor: StatusColorStrings =
                r.title.toUpperCase() as StatusColorStrings;
              return (
                <div key={index} className="p-1">
                  <DropdownMenuItem
                    onClick={() =>
                      handleProjectStatus(
                        Status[r.title.toUpperCase() as StatusStrings]
                      )
                    }
                    className={`flex gap-2 items-center border-l-4 ${
                      r.title.toLowerCase() === status.toLowerCase()
                        ? `bg-secondary-background border-l-4`
                        : ""
                    }`}
                    style={{
                      borderColor:
                        r.title.toLowerCase() === status.toLowerCase()
                          ? StatusColor[statusColor]
                          : "transparent",
                    }}
                  >
                    <r.icon size={18} color={StatusColor[statusColor]} />
                    <span>{r.title}</span>
                  </DropdownMenuItem>
                  {index < projectStatus.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </div>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectStatusDropdown;
