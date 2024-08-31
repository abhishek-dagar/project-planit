import { RocketIcon } from "@/components/icons/rocket";
import Settings from "@/components/icons/settings";
import { TaskIcon } from "@/components/icons/task";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderKanbanIcon,
  ListIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  project: any;
  selected: any;
  disabled?: boolean;
};

const Collapse = ({ project, selected, disabled }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const searchParams = useSearchParams();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <RocketIcon selected={selected.project} size={20} />
            <span
              className={`${
                selected.project
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              {project.name}
            </span>
            {isOpen ? (
              <ChevronDownIcon size={14} className="-ml-1" />
            ) : (
              <ChevronRightIcon size={14} className="-ml-1" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="" style={{ marginTop: 0 }}>
        <Link
          href={`/app/projects?projectId=${project.id}&tab=tasks`}
          className="rounded-md flex items-center gap-2 border-0 px-2 text-sm"
        >
          <Button
            variant="ghost"
            size="sm"
            className={`py-0 pl-5 hover:bg-background text-muted-foreground hover:text-foreground group bg-opacity-40 w-full justify-start ${
              selected.tab === "tasks" ? "bg-background text-foreground" : ""
            }`}
          >
            <TaskIcon selected={false} size={30} />
            <p>Tasks</p>
          </Button>
        </Link>
        <div className="flex flex-col gap-2 ml-11 my-1 pl-4 border-l-2 border-background text-muted-foreground">
          <Link
            href={`/app/projects?projectId=${
              project.id
            }&tab=tasks&view=list&groupBy=${searchParams.get("groupBy")}`}
            className={cn(
              "flex items-center gap-2 hover:text-foreground ",
              selected.project &&
                (!searchParams.get("view") ||
                  searchParams.get("view") === "list") &&
                "text-foreground"
            )}
          >
            <ListIcon
              size={14}
              className={cn(
                selected.project &&
                  (!searchParams.get("view") ||
                    searchParams.get("view") === "list") &&
                  "text-primary"
              )}
            />
            List
          </Link>
          <Link
            href={`/app/projects?projectId=${project.id}&tab=tasks&view=board${
              searchParams.get("groupBy") &&
              searchParams.get("groupBy") !== "null"
                ? "&groupBy=" + searchParams.get("groupBy")
                : "&groupBy=status"
            }`}
            className={cn(
              "flex items-center gap-2 hover:text-foreground",
              selected.project &&
                searchParams.get("view") === "board" &&
                "text-foreground"
            )}
          >
            <FolderKanbanIcon
              size={14}
              className={cn(
                selected.project &&
                  searchParams.get("view") === "board" &&
                  "text-primary"
              )}
            />
            Board
          </Link>
        </div>
        {disabled !== true && (
          <Link
            href={`/app/projects?projectId=${project.id}&tab=settings`}
            className="rounded-md flex items-center gap-2 border-0 px-2 text-sm"
          >
            <Button
              variant="ghost"
              size="sm"
              className={`py-0 pl-5 hover:bg-background text-muted-foreground hover:text-foreground group bg-opacity-40 w-full justify-start ${
                selected.tab === "settings"
                  ? "bg-background text-foreground"
                  : ""
              }`}
            >
              <Settings selected={false} size={30} className="p-[5px]" />
              <p>settings</p>
            </Button>
          </Link>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Collapse;
