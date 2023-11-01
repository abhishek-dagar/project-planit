"use client";

import { fetchUser } from "@/lib/actions/user.actions";
import { Team } from "@/lib/interfacesOrEnum/teams-group";
import { setMembers } from "@/redux/features/memberSlice";
import { setProjects } from "@/redux/features/projectSlice";
import { setTeams } from "@/redux/features/teamsSlice";
import { setUser } from "@/redux/features/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {
    isFetch?: boolean | undefined;
  };
}

const useUser = ({ configs = { isFetch: false } }: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const { teams } = useSelector((state: any) => state.teams);
  const dispatch = useDispatch();
  const setUpdatedUser = (updatedUser: any) => {
    dispatch(setUser(updatedUser));
  };

  useEffect(() => {
    if (user) {
      const tempUser = JSON.parse(JSON.stringify(user));
      tempUser.teams = teams;
      dispatch(setUser(tempUser));
    }
  }, [teams]);

  useEffect(() => {
    if (configs.isFetch) {
      // setTimeout(() => {
      fetchUser().then(({ response }) => {
        dispatch(setUser(response));

        dispatch(setTeams(response.teams));
        const projects: any = {};
        response.teams.map(
          (team: Team) => (projects[`${team.id}`] = team.projects)
        );

        dispatch(setProjects(projects));

        dispatch(setMembers(response.members));
      });
      // }, 3000);
    }
  }, []);
  return [user, { setUpdatedUser }];
};

export default useUser;
