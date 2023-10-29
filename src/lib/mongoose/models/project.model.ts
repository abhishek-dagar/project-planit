import mongoose from "mongoose";
import modelOptions from "./mongoose.options";
import { Status } from "@/lib/interfacesOrEnum/teams-group";

interface ProjectSchema {
  name: string;
  description: string;
  status: Status;
  tasks: mongoose.Schema.Types.ObjectId[];
  pinned: boolean;
}
const projectSchema = new mongoose.Schema<ProjectSchema>(
  {
    name: {
      type: String,
      required: [true, "Please provide a project name"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.PLANNING,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  modelOptions
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
