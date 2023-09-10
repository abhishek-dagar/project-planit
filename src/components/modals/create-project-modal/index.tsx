import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import CreateProject from "../create-project-modal/create-project";
import { useDispatch, useSelector } from "react-redux";
import { updateUserTeam } from "@/lib/helpers/handleUser";
import { setUser } from "@/redux/features/userSlice";
import { createProject } from "@/lib/actions/project.action";
import { Team } from "@/lib/interfacesOrEnum/teams-group";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";

const CreateProjectModal = ({
  handleOpen,
  open,
  team,
}: {
  handleOpen: () => void;
  open: boolean;
  team: Team;
}) => {
  const [project, setProject] = useState({
    name: "",
    teamId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleProjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (project.name.length > 0) {
      setError({
        isError: false,
        errorMessage: "",
      });
    }
    setProject((prevState) => ({ ...prevState, name: event.target.value }));
  };
  const handleCreateProject = async () => {
    if (error.isError) return;
    if (project.name.length < 1) {
      setError({
        isError: true,
        errorMessage: "Please enter the project name",
      });
      return;
    }
    setIsLoading(true);
    if (team.id && team.id !== null && team.id !== "") {
      const newProject = await createProject({
        name: project.name,
        teamId: team.id,
      });
      team.projects?.push(newProject);
    }

    const updateUser = updateUserTeam(user, team);

    dispatch(setUser(updateUser));
    handleOpen();
    setIsLoading(false);
    setProject({ name: "", teamId: "" });
  };

  useEffect(() => {
    if (!open) {
      setError({
        isError: false,
        errorMessage: "",
      });
      setProject({ name: "", teamId: "" });
    }
  }, [open]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="uppercase">Create a Project</DialogTitle>
        <DialogDescription>{`Team Name: ${team.name}`}</DialogDescription>
      </DialogHeader>
      <CreateProject
        project={project}
        handleProjectName={handleProjectName}
        error={error}
      />
      <DialogFooter>
        <Button onClick={handleCreateProject} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Project
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateProjectModal;
