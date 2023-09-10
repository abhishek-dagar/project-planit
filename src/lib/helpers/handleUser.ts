import { Team } from "../interfacesOrEnum/teams-group";

export const addUserNewTeam = (user: any, team: Team) => {
  const tempUser = JSON.parse(JSON.stringify(user));
  tempUser.teams?.push(team);
  return tempUser;
};
export const updateUserTeam = (user: any, team: Team) => {
  const tempUser = JSON.parse(JSON.stringify(user));
  const tempTeams = JSON.parse(JSON.stringify(user.teams));
  const updateTeams = tempTeams.map((tempTeam: any) => {
    if (tempTeam.id === team.id) return team;
    return tempTeam;
  });
  tempUser.teams = updateTeams;
  return tempUser;
};
