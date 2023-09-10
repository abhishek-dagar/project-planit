import axios from "axios";
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
