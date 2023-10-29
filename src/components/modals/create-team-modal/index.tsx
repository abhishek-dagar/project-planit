import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import CreateTeam from "./create-team";
import CreateProject from "../create-project-modal/create-project";
import { createTeam } from "@/lib/actions/team.action";
import { useDispatch, useSelector } from "react-redux";
import { addUserNewTeam } from "@/lib/helpers/handleUser";
import { setUser } from "@/redux/features/userSlice";
import { createProject } from "@/lib/actions/project.action";
import { Icons } from "@/components/icons";
import useTeams from "@/components/custom-hooks/teams";

const CreateTeamModal = ({
  handleOpen,
  open,
}: {
  handleOpen: () => void;
  open: boolean;
}) => {
  const [newTeam, setNewTeam] = useState({
    icon: "",
    name: "",
  });
  const [project, setProject] = useState({
    name: "",
    teamId: "",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: create a error handler for project name input too
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const { user } = useSelector((state: any) => state.user);
  const [_, { addNewTeam }] = useTeams({});
  const dispatch = useDispatch();

  const handleTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeam((prevState) => ({ ...prevState, name: event.target.value }));
  };
  const handleTeamIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeam((prevState) => ({ ...prevState, icon: event.target.value }));
  };

  const handleProjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (project.name.length > 0) {
      setError({
        isError: false,
        errorMessage: "",
      });
    }
    setProject((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleCreateTeam = () => {
    if (newTeam.name !== "") {
      setActiveTab(1);
    }
  };
  const handleBack = () => {
    setActiveTab(0);
  };
  const handleCreateProject = (skip: boolean) => {
    if (skip) {
      setError({
        isError: false,
        errorMessage: "",
      });
    }
    if (error.isError && !skip) return;
    if (project.name.length < 1 && !skip) {
      setError({
        isError: true,
        errorMessage: "Please enter the project name",
      });
      return;
    }
    setIsLoading(true);
    setNewTeam({ icon: "", name: "" });
    setProject({ name: "", teamId: "" });
    createTeam(newTeam).then(async (team) => {
      if (!skip) {
        const newProject = await createProject({
          name: project.name,
          teamId: team.id,
        });
        //* COMPLETED: create a helper function to update team
        //* COMPLETED: create a helper function to update user details
        team.projects?.push(newProject);
      }
      addNewTeam(team);
      setActiveTab(0);
      setIsLoading(false);
      handleOpen();
    });
  };

  useEffect(() => {
    if (!open) {
      setError({
        isError: false,
        errorMessage: "",
      });
      setNewTeam({ icon: "", name: "" });
      setProject({ name: "", teamId: "" });
      setActiveTab(0);
    }
  }, [open]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="uppercase">
          {activeTab == 0 ? "Create a new team" : "Create a Project"}
        </DialogTitle>
        <DialogDescription>
          {activeTab === 0
            ? "Starting Fresh: Craft Your Team from the Ground Up"
            : `Team Name: ${newTeam?.name}`}
        </DialogDescription>
      </DialogHeader>
      {activeTab === 0 ? (
        <CreateTeam
          team={newTeam}
          handleTeamName={handleTeamName}
          handleTeamIcon={handleTeamIcon}
        />
      ) : (
        <CreateProject
          project={project}
          handleProjectName={handleProjectName}
          error={error}
        />
      )}
      <div className="flex gap-2 justify-center">
        <div
          className={
            "w-3 h-3 rounded-full border-[1px] " +
            (activeTab >= 0 ? "bg-primary" : "bg-secondary-background")
          }
        />
        <div
          className={
            "w-3 h-3 rounded-full border-[1px] " +
            (activeTab === 1 ? "bg-primary" : "bg-secondary-background")
          }
        />
      </div>
      <DialogFooter>
        {activeTab === 0 && <Button onClick={handleCreateTeam}>Next</Button>}
        {activeTab === 1 && (
          <>
            <Button variant={"link"} onClick={handleBack} disabled={isLoading}>
              Back
            </Button>
            <Button
              variant={"link"}
              onClick={() => handleCreateProject(false)}
              disabled={isLoading}
            >
              skip
            </Button>
            <Button
              onClick={() => handleCreateProject(false)}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateTeamModal;
