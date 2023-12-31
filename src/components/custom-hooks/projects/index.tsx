"use client";

import { Project, Team } from "@/lib/interfacesOrEnum/teams-group";
import { setProjects } from "@/redux/features/projectSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {};
}

const useProjects = ({ configs = {} }: Props) => {
  const { projects } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();
  const setUpdatedProjects = (updatedProjects: any) => {
    dispatch(setProjects(updatedProjects));
  };
  const addNewProject = (teamId: string, newProject: Project) => {
    const tempProjects = JSON.parse(JSON.stringify(projects));
    tempProjects[`${teamId}`]?.push(newProject);
    const updatedProjects = tempProjects;
    dispatch(setProjects(updatedProjects));
  };

  const getTeamProjects = (teamId: string) => {
    return projects[`${teamId}`];
  };

  const updateProject = (teamId: string, updatedProject: Project) => {
    const tempProject = JSON.parse(JSON.stringify(projects));

    tempProject[`${teamId}`] = tempProject[`${teamId}`].map((project: any) => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      }
      return project;
    });

    dispatch(setProjects(tempProject));
  };

  return [
    projects,
    { setUpdatedProjects, addNewProject, getTeamProjects, updateProject },
  ];
};

export default useProjects;
