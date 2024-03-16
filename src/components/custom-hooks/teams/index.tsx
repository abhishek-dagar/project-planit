import { Project, Team } from "@/lib/interfacesOrEnum/teams-group";
import { setProjects } from "@/redux/features/projectSlice";
import { setTeams } from "@/redux/features/teamsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {};
}

const useTeams = ({ configs = {} }: Props) => {
  const { teams } = useSelector((state: any) => state.teams);
  const { projects } = useSelector((state: any) => state.projects);
  const { members } = useSelector((state: any) => state.members);
  const dispatch = useDispatch();
  const setUpdatedTeams = (updatedTeams: any) => {
    dispatch(setTeams(updatedTeams));
  };
  const addNewTeam = (newTeam: Team) => {
    let tempTeams = JSON.parse(JSON.stringify(teams));
    let tempProjects = JSON.parse(JSON.stringify(projects));
    tempTeams.push(newTeam);
    tempProjects[`${newTeam.id}`] = newTeam.projects;
    dispatch(setProjects(tempProjects));
    dispatch(setTeams(tempTeams));
  };

  const fetchTeam = (teamId: string) => {
    const team = teams.find((team: Team) => team.id === teamId);
    return team;
  };

  function updateTeam(team: Team) {
    const tempTeam = teams.map((te: Team) => {
      if (te.id === team.id) return team;
      return te;
    });

    dispatch(setTeams(tempTeam));
  }
  useEffect(() => {
    if (teams) {
      let tempTeams = JSON.parse(JSON.stringify(teams));
      tempTeams = tempTeams.map((team: Team) => {
        team.projects = projects[`${team.id}`];
        return team;
      });

      dispatch(setTeams(tempTeams));
    }
  }, [projects, members]);
  return [teams, { setUpdatedTeams, updateTeam, addNewTeam, fetchTeam }];
};

export default useTeams;
