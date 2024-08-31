"use client";
import { RocketIcon } from "@/components/icons/rocket";
import React, { useState } from "react";
import Collapse from "./collapse";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Props {
  projects: any;
  disabled?: boolean;
}

const SubSidebar = ({ projects, disabled }: Props) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  return (
    <div className="bg-muted h-full flex flex-col gap-2">
      <div className="w-full px-1 pr-5">
        <Input
          placeholder="Search"
          value={search}
          className="rounded-full px-3 border-0"
          frontIcon={<SearchIcon size={14} className="text-muted-foreground" />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="h-full overflow-auto pl-4 pb-20 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Projects</h1>
        {projects.filter((project: any) =>
          project.name.toLowerCase().includes(search)
        ).length > 0 ? (
          projects
            .filter((project: any) =>
              project.name.toLowerCase().includes(search)
            )
            .map((project: any) => (
              <Collapse
                key={project.id}
                project={project}
                disabled={disabled}
                selected={{
                  project: searchParams.get("projectId") === project.id,
                  tab:
                    searchParams.get("projectId") === project.id
                      ? searchParams.get("tab")
                      : "",
                }}
              />
            ))
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <RocketIcon size={60} selected />
            <h1 className="text-3xl">No Project</h1>
            <p className="text-muted-foreground">create a project to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubSidebar;
