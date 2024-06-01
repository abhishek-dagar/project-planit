import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateProject } from "@/lib/actions/project.action";
import { ProjectStatus, ProjectStatusColor } from "@/lib/types/project.type";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  HelpCircleIcon,
  LoaderIcon,
  OrbitIcon,
  PauseIcon,
  XCircleIcon,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
};

const ProjectStatusDropdown = ({ project, setProject }: Props) => {
  type ProjectStatusColorStrings = keyof typeof ProjectStatusColor;
  const Icons = [
    OrbitIcon,
    LoaderIcon,
    PauseIcon,
    HelpCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
  ];

  const handleUpdateStatus = async (status: string) => {
    try {
      if (status === project.status) return;
      const res = await updateProject({
        ...project,
        status,
      });
      if (res.updatedProject) {
        toast.success("Project status updated");
        setProject(res.updatedProject);
      }
    } catch (err) {
      toast.error("Failed to change status");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`border-l-4 px-2 h-8 min-w-[120px] justify-between focus-visible:ring-0`}
          variant={"secondary"}
          style={{
            borderColor:
              ProjectStatusColor[project.status as ProjectStatusColorStrings],
          }}
        >
          {project.status}
          <ChevronRightIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2" align="start">
        {Object.keys(ProjectStatus)
          .filter((key) => isNaN(Number(key)))
          .map((status, index) => {
            const Icon = Icons[index];
            return (
              <DropdownMenuItem
                key={status}
                className={`flex gap-2 ${
                  project.status === status ? "bg-muted" : ""
                }`}
                onClick={() => handleUpdateStatus(status)}
              >
                <Icon
                  size={16}
                  style={{
                    color:
                      ProjectStatusColor[status as ProjectStatusColorStrings],
                  }}
                />
                {status}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectStatusDropdown;
