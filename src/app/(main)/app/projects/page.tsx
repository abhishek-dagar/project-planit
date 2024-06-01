"use client";
import { RocketIcon } from "@/components/icons/rocket";
import { fetchProject, updateProject } from "@/lib/actions/project.action";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TaskPage from "./_components/task-page";
import Settings from "./_components/settings-page";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import ProjectStatusDropdown from "./_components/project-status-dropdown";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const [project, setProject] = useState<any | null>();
  const [tab, setTab] = useState<string | null>();
  const searchParams = useSearchParams();

  const markProjectFavorite = async () => {
    try {
      const res = await updateProject({
        ...project,
        favorite: !project.favorite,
      });
      if (res.updatedProject) {
        toast.success(
          `Project marked ${
            res.updatedProject.favorite ? "favorite" : "unfavorite"
          }`
        );
        setProject(res.updatedProject);
      }
    } catch (err) {
      toast.error("Failed to change favorite");
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchPro = async () => {
      try {
        const pro = await fetchProject(searchParams.get("projectId"));
        setProject(pro?.project);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPro();
  }, [searchParams.get("projectId")]);

  useEffect(() => {
    setTab(searchParams.get("tab"));
  }, [searchParams.get("tab")]);

  return (
    <div className="h-full flex flex-col relative">
      {project && (
        <div className="flex border-b py-2 px-5 gap-2 items-center">
          <p className="text-xl font-bold capitalize">{tab}</p>
          <Separator orientation="vertical" className="h-[25px]" />
          <div className="flex items-center gap-5">
            <p className="flex items-center gap-2">
              {project.name}
              <Button
                variant={"ghost"}
                size={"icon"}
                className="p-0 h-auto w-auto"
                onClick={markProjectFavorite}
              >
                <StarIcon
                  size={14}
                  className={`${
                    project.favorite ? "fill-[#f2be00] text-[#f2be00]" : ""
                  }`}
                />
              </Button>
            </p>
            <ProjectStatusDropdown project={project} setProject={setProject} />
          </div>
        </div>
      )}
      {searchParams.get("projectId") ? (
        project && tab === "tasks" ? (
          <TaskPage project={project} />
        ) : project && tab === "settings" ? (
          <Settings project={project} />
        ) : (
          <ProjectSkeleton />
        )
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <RocketIcon size={60} selected />
          <h1 className="text-4xl">No Project selected</h1>
          <p className="text-muted-foreground">select a project to view</p>
        </div>
      )}
    </div>
  );
};

const ProjectSkeleton = () => {
  return (
    <div>
      <div className="border-b px-4 py-4">
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="flex flex-col gap-2 py-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

export default Projects;
