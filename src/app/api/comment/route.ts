import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import Comment from "@/lib/mongoose/models/comment.model";
import Task from "@/lib/mongoose/models/task.model";
import User from "@/lib/mongoose/models/user.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const newComment = new Comment({
      ...reqBody,
    });

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    newComment["changedBy"] = user.id;
    const task = await Task.findById(reqBody.taskId);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    task.comments.push(newComment.id);

    const updatedTask = await Task.findByIdAndUpdate(task.id, { ...task });

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Failed to update task" },
        { status: 304 }
      );
    }

    newComment.save();

    return NextResponse.json(
      {
        message: "Comment created Successfully",
        success: true,
        comment: { ...newComment._doc, id: newComment._id },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
