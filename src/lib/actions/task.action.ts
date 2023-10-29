import axios from "axios";

const url = "/api/task";

const taskEndpoints = {
  task: url,
};

export async function updateTask(task: any) {
  try {
    await axios.put(taskEndpoints.task, task);
    return { success: true };
  } catch (err) {
    return err;
  }
}

export async function addNewTask(task: any) {
  try {
    await axios.post(taskEndpoints.task, task);
    return { success: true };
  } catch (err) {
    return err;
  }
}
