import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import ChangeName from "./change-name";
import DeleteConfirmModal from "@/components/common/delete-confirm-modal";
import { deleteProject } from "@/lib/actions/project.action";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/helpers/getTokenData";

type Props = {
  project: any;
};

const Settings = ({ project }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const { deletedProject, err } = await deleteProject(project.id);
      console.log(deletedProject);

      if (deletedProject) {
        router.push("/app/projects");
        return { success: "Project deleted Successfully" };
      }
      if (err) {
        return { err: "failed to delete" };
      }
    } catch {
      return { err: "failed to delete" };
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await currentUser();
      if (user?.role?.name === "member") {
        router.push("/app/projects");
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center pt-4 pb-8 gap-4 relative overflow-auto">
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
