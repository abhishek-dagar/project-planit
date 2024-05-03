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
    const newTask = await axios.post(taskEndpoints.task, task);
    if (newTask.data) return { success: true, task: newTask.data.task };
    return { success: false };
  } catch (err) {
    return err;
  }
}

export async function deleteTask(taskId: any) {
  try {
    await axios.delete(taskEndpoints.task + `/${taskId}`);
    return { success: true };
  } catch (err) {
    return err;
  }
}
