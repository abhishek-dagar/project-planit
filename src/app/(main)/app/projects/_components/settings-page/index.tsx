import { Separator } from "@/components/ui/separator";
import React from "react";
import ChangeName from "./change-name";
import DeleteConfirmModal from "@/components/common/delete-confirm-modal";
import { deleteProject } from "@/lib/actions/project.action";
import { redirect, useRouter } from "next/navigation";

type Props = {
  project: any;
};

const Settings = ({ project }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const { deletedProject } = await deleteProject(project.id);
      router.push("/app/projects");
      if (deletedProject) {
        return { success: "Project deleted Successfully" };
      }
    } catch {
      return { err: "failed to delete" };
    }
  };
  return (
    <div className="flex flex-col items-center pb-8 gap-4 relative overflow-auto">
      <div className="w-3/4">
        <h1 className="text-xl">General Settings</h1>
        <ChangeName project={project} />
        <Separator className="mt-2" />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-start">
        <h1 className="text-xl">Delete Team</h1>
        <p className="text-muted-foreground">Are you sure you want to delete</p>
        <DeleteConfirmModal onConfirm={handleDelete} />
        <Separator className="mt-2" />
      </div>
    </div>
  );
};

export default Settings;
