import Comment from "@/lib/mongoose/models/comment.model";
import Project from "@/lib/mongoose/models/project.model";
import Task from "@/lib/mongoose/models/task.model";
import User from "@/lib/mongoose/models/user.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { projectId }: any = context.params;

    let project = await Project.findById(projectId).populate({
      path: "tasks",
      model: Task,
      populate: [
        {
          path: "assignedTo",
          model: User,
        },
        {
          path: "comments",
          model: Comment,
          populate: {
            path: "changedBy",
            model: User,
          },
        },
      ],
    });

    project = { ...project._doc, id: project.id, groupedTasks: {} };
    // console.log(project);

    if (true) {
      await project.tasks.map((task: any) => {
        if (
          project.groupedTasks[task.status] &&
          project.groupedTasks[task.status].length > 0
        ) {
          project.groupedTasks[task.status].push(task);
        } else {
          project.groupedTasks[task.status] = [task];
        }
      });
    }

    if (!project) {
      return NextResponse.json(
        { message: "Failed to fetch project", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "project fetched", data: project, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: "string" }
) => {
  try {
    const { projectId }: any = context.params;
    const project = await Project.findById(projectId);
    project.tasks.forEach(async (task: any) => {
      const taskObj = await Task.findById(task);
      taskObj.comments.forEach(async (comment: any) => {
        await Comment.deleteOne({ _id: comment });
      });
      await Task.deleteOne({ _id: task });
    });
    await Project.deleteOne({ _id: projectId });
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
