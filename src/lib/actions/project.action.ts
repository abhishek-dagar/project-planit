import axios from "axios";
import axiosClient from "../axios-functions/client";
import { Project } from "../interfacesOrEnum/teams-group";
export async function createProject(data: any) {
  try {
    const res: any = await axios.post("/api/project", data);

    if (res.data.success) {
      return res.data.project;
    }
    return res;
  } catch (error) {
    return error;
  }
}

export async function fetchProject(id: string) {
  try {
    const project = await axiosClient.get(`/project/${id}`);

    if (project.data) {
      return project.data;
    }
  } catch (error) {
    return error;
  }
}

export async function updateProject(updatedProject: Project) {
  try {
    const project = await axios.put(`/api/project`, updatedProject);
    if (project.data) {
      return project.data;
    }
  } catch (err) {
    return err;
  }
}

export async function deleteProject(projectId: any) {
  try {
    // console.log(projectId);
    
    await axios.delete(`/api/project/${projectId}`);
    return { success: true };
  } catch (err) {
    return err;
  }
}