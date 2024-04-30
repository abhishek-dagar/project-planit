import axios from "axios";
import { Team } from "../interfacesOrEnum/teams-group";
import axiosClient from "../axios-functions/client";

export async function getTeam(teamId: string, ssr?: boolean) {
  try {
    const team: any = await axiosClient.get(`/team/${teamId}`);
    if (team.data.success) {
      return { team: team.data.data };
    }
    if (ssr && team.success) {
      return team.data;
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

export async function deleteTeam(teamId: any) {
  try {
    // console.log(teamId);
    
    await axios.delete(`/api/team/${teamId}`);
    return { success: true };
  } catch (err) {
    return err;
  }
}