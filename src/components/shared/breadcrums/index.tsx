"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProjectStatusDropdown from "../dropdowns/project-status-dropdown";
import useProjects from "@/components/custom-hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { updateProject } from "@/lib/actions/project.action";
import { toast } from "@/components/ui/use-toast";

const Breadcrumb = ({ team, project }: any) => {
  const [currentProject, setCurrentProject] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const projectHook = useProjects({});

  const handleProjectStatus = async (status: string) => {
    const oldStatus = currentProject?.status;
    try {
      setIsLoading(true);
      const updatedProject = { ...currentProject, status: status };
      setCurrentProject(updatedProject);
      const response = await updateProject(updatedProject);
      if (response && response.success) {
        toast({
          description: `Project status updated from ${oldStatus} to ${status}`,
        });
        projectHook[1].updateProject(team.id, updatedProject);
      } else {
        setCurrentProject({ ...project, status: oldStatus });
        toast({
          description: `Fails to update project status`,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);

      setCurrentProject({ ...project, status: oldStatus });
      toast({
        description: `Fails to update project status`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project]);

  return (
    <div className="flex items-center gap-4">
      <p className="uppercase truncate text-slate-400">
        <Link href={"/app/teams"} className="hover:underline hover:text-white">
          Teams
        </Link>
        {team.icon}
      </p>
      {" > "}
      <Link
        href={`/app/teams/${team.id}`}
        className="text-muted-foreground hover:underline hover:text-white"
      >
        <p>{team?.name}</p>
      </Link>
      {" > "}
      {currentProject ? (
        <p className="text-muted-foreground">{currentProject.name}</p>
      ) : (
        <Skeleton className="bg-background w-[100px] h-[25px] rounded-md" />
      )}
      <div>
        {currentProject ? (
          <ProjectStatusDropdown
            status={currentProject.status}
            handleProjectStatus={handleProjectStatus}
            isLoading={isLoading}
          />
        ) : (
          <Skeleton className="bg-background w-[100px] h-[35px] rounded-md" />
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
