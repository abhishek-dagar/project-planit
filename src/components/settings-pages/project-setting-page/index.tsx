"use client";

import useProjects from "@/components/custom-hooks/projects";
import { Icons } from "@/components/icons";
import DeleteTeamModal from "@/components/modals/delete-modal";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/lib/actions/project.action";
import { Project, Status } from "@/lib/interfacesOrEnum/teams-group";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PencilLine } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  project: Project;
  teamId: string;
}

const ProjectSettingsPage = ({ project, teamId }: Props) => {
  const [updatedProject, setUpdatedProject] = useState<Project>({
    id: "",
    name: "",
    link: "",
    status: Status.PLANNING,
  });
  const projectHook = useProjects({});
  const [loading, setLoading] = useState({ rename: false });

  const handleUpdatedProject = (e: any) => {
    setUpdatedProject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateCurrentTeam = async () => {
    try {
      setLoading((prev) => ({ ...prev, rename: true }));
      const response: any = await updateProject(updatedProject);

      if (response.success) {
        const [_, { updateProject }] = projectHook;
        updateProject(teamId, updatedProject);
        setUpdatedProject(updatedProject);
        project.name = updatedProject.name;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, rename: false }));
    }
  };

  useEffect(() => {
    setUpdatedProject(project);
  }, []);

  return (
    <div className="p-5">
      <div>
        <p className="text-[12px] md:text-[12px] font-bold flex items-center gap-2 uppercase">
          Team Name
        </p>
        <div className="flex gap-2 items-center">
          <Input
            name="name"
            className={"py-0 focus-visible:ring-1 bg-background"}
            clName={"h-7 w-60"}
            value={updatedProject.name}
            onChange={handleUpdatedProject}
          />
          <Button
            variant={"secondary"}
            className="hover:ring-2 bg-background border hover:ring-primary h-7"
            onClick={updateCurrentTeam}
            disabled={loading.rename}
          >
            {loading.rename ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PencilLine size={14} className="mr-2" />
            )}
            Rename
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <p className="text-[24px] capitalize text-red-500">Danger Zone</p>
        <div className="border border-red-500 rounded-md p-4 bg-secondary-background">
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div>
              <p className="text-[18px] font-bold">Delete this Project</p>
              <p className="text-[12px] font-medium">
                Once you delete a project, there is no going back, loose all
                tasks, Please be certain.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-secondary-background border border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white">
                  Delete this Project
                </Button>
              </DialogTrigger>
              <DeleteTeamModal deleteContent={project} />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
