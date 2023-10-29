import mongoose from "mongoose";
import modelOptions from "./mongoose.options";
import { TaskPriority, TaskStatus } from "@/lib/interfacesOrEnum/teams-group";

interface TaskSchema {
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: mongoose.Schema.Types.ObjectId;
  comments: mongoose.Schema.Types.ObjectId[];
}
const taskSchema = new mongoose.Schema<TaskSchema>(
  {
    title: { type: String, required: [true, "Please provide a task title"] },
    description: { type: String },
    startDate: { type: Date, default: new Date() },
    dueDate: { type: Date },
    priority: { type: String, enum: TaskPriority, default: TaskPriority.NONE },
    status: { type: String, enum: TaskStatus, default: TaskStatus.TODO },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  modelOptions
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
