"use client";

import { Project, StatusColor, Team } from "@/lib/interfacesOrEnum/teams-group";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Hash,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateProjectModal from "@/components/modals/create-project-modal";

interface Props {
  name: string;
  icon?: any;
  link?: string;
  element: Project[] | undefined;
  team?: Team;
}

const Collapse = ({ icon, name, link, element, team }: Props) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen((prev) => !prev);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Collapsible
      open={open}
      className={
        "my-2 w-full overflow-hidden border-b-[1px] md:pb-0 md:border-0 " +
        (open ? "pb-0" : "pb-2")
      }
    >
      <div className="flex items-center">
        <div
          className={
            " flex-1 select-none cursor-pointer flex items-center " +
            (icon ? "" : "gap-2")
          }
          onClick={handleOpen}
        >
          {open ? <ChevronDown /> : <ChevronRight />}
          <p className="capitalize text-[14px] w-[130px] truncate">
            {icon}
            {name}
          </p>
        </div>
        <Link
          href={link ? link : ""}
          className="text-[14px] h-5 w-5 p-0.5 hover:text-primary"
        >
          <ExternalLink size={14} />
        </Link>
      </div>
      <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
        <div className="flex flex-col gap-2 mt-2 ml-6">
          {element?.map((ele) => {
            return (
              <Link key={ele.name} href={ele.link ? ele.link : ""}>
                <div className="flex gap-2 border-b-[1px] pb-2 md:pb-0 md:border-0">
                  <Hash style={{ color: StatusColor[ele.status] }} />
                  <p className="text-[14px] w-[120px] truncate">{ele.name}</p>
                </div>
              </Link>
            );
          })}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="flex items-center gap-2 border-b-[1px] p-0 h-8 md:border-0 cursor-pointer select-none hover:bg-secondary"
              >
                <Plus size={16} />
                <p className="text-[14px] w-[120px] truncate">
                  Add new project
                </p>
              </Button>
            </DialogTrigger>
            {team && (
              <CreateProjectModal
                handleOpen={handleDialogOpen}
                open={dialogOpen}
                team={team}
              />
            )}
          </Dialog>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Collapse;
