import Comment from "@/lib/mongoose/models/comment.model";
import Task from "@/lib/mongoose/models/task.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { taskId }: any = context.params;
    const tasks = await Task.find({});
    return NextResponse.json(
      { message: "project fetched", data: {}, success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "project failed to fetched" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: "string" }
) => {
  try {
    const { taskId }: any = context.params;
    const task = await Task.findById(taskId);
    task.comments.forEach(async (comment: any) => {
      await Comment.deleteOne({ _id: comment });
    });
    await Task.deleteOne({ _id: taskId });
    return NextResponse.json(
      { message: "project deleted successfully", data: {}, success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "project failed to delete" },
      { status: 500 }
    );
  }
};
