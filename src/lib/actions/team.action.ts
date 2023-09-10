import axios from "axios";
import { Team } from "../interfacesOrEnum/teams-group";

export async function getTeam(teamId: string) {
  try {
    const team = await axios.get(`/api/team/${teamId}`);
    if (team.data.success) {
      return { team: team.data.data };
    }
  } catch (error) {
    return error;
  }
}
export async function fetchPlan(price: string | null) {
  try {
    const { data } = await axios.get("/api/pricing/" + price);
    return data.pricingData;
  } catch (error) {
    return error;
  }
}

export async function updateTeam(team: Team) {
  try {
    await axios.put("/api/team", team);
    return { success: true };
  } catch (err) {
    return err;
  }
}

export async function createTeam(data: Team) {
  try {
    const res: any = await axios.post("/api/team", data);

    if (res.data.success) {
      return res.data.team;
    }
  } catch (error) {}
}
