import mongoose from "mongoose";
import modelOptions from "./mongoose.options";

interface TaskSchema {
  changedBy: mongoose.Schema.Types.ObjectId;
  comment: string;
  from: string;
  to: string;
  taskId: mongoose.Schema.Types.ObjectId;
}
const commentSchema = new mongoose.Schema<TaskSchema>(
  {
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String },
    from: { type: String },
    to: { type: String },
    taskId: { type: mongoose.Schema.Types.ObjectId },
  },
  modelOptions
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
