import mongoose, { SchemaDefinitionProperty } from "mongoose";
import modelOptions from "./mongoose.options";
interface TeamSchema {
  name: string;
  icon: string;
  teamLead: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
  projects: mongoose.Schema.Types.ObjectId[];
  pinned: boolean;
}
const teamSchema = new mongoose.Schema<TeamSchema>(
  {
    name: {
      type: String,
      required: [true, "Please provide a team name"],
    },
    icon: {
      type: String,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    pinned: { type: Boolean, default: false },
  },
  modelOptions
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
