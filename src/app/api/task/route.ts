import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import User from "@/lib/mongoose/models/user.model";
import Task from "@/lib/mongoose/models/task.model";
import Project from "@/lib/mongoose/models/project.model";
import Comment from "@/lib/mongoose/models/comment.model";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const project = await Project.findById(reqBody.projectId);
    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );

    const comment = new Comment({
      comment: "Task Created At",
    });

    const newTask = new Task({
      ...reqBody,
      comments: [comment._id],
    });
    comment.taskId = newTask._id;
    await comment.save();
    if (project.tasks) {
      project.tasks.push(newTask);
    } else {
      project.tasks = [newTask];
    }
    await newTask.save();
    await Project.findByIdAndUpdate(reqBody.projectId, project);

    return NextResponse.json(
      {
        message: "Task created Successfully",
        success: true,
        team: { ...newTask._doc, id: newTask._id },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const task = await Task.findById(reqBody.id);
    if (!task) {
      return NextResponse.json(
        { message: "task Not found", success: false },
        { status: 404 }
      );
    }

    const comments: Comment[] = [];
    Object.keys(task?._doc).map((key) => {
      if (task?._doc[key] !== reqBody[key]) {
        let newComment: any | undefined = undefined;
        if (key === "status") {
          newComment = {
            comment: "Changed Status",
            from: task[key],
            to: reqBody[key],
          };
        }
        if (key === "priority") {
          newComment = {
            comment: "Changed Priority",
            from: task[key],
            to: reqBody[key],
          };
        }
        if (key === "dueDate" && task[key].dueDate !== reqBody[key].dueDate) {
          newComment = {
            comment: "Changed Due Date",
            to: reqBody[key],
          };
        }
        if (
          key === "assignedTo" &&
          task?._doc[key].toString() !== reqBody[key].id
        ) {
          newComment = {
            comment: "Task Assigned",
            to: reqBody[key]?.username,
          };
        }
        if (newComment) {
          comments.push(
            new Comment({ ...newComment, changedBy: user, taskId: reqBody.id })
          );

          // if (reqBody.comments) {
          //   reqBody.comments.push(newComment?._id);
          // } else {
          //   reqBody.comments = [newComment?._id];
          // }
        }
      }
    });

    comments.map(async (comment: any) => await comment.save());
    if (!reqBody.assignedTo) {
      reqBody.assignedTo = null;
    }

    if (typeof reqBody.assignedTo !== "string" && reqBody.assignedTo !== null) {
      reqBody.assignedTo = reqBody.assignedTo?.id;
    }
    if (typeof reqBody.comments !== "string" && reqBody.comments !== null) {
      reqBody.comments = task.comments.map((comment: any) => comment?._id);
      comments.map((comment: any) => reqBody.comments.push(comment?._id));
    }

    const updatedTask = await Task.findByIdAndUpdate(reqBody.id, {
      ...reqBody,
    });

    return NextResponse.json(
      {
        message: "Team updated Successfully",
        success: true,
        team: updatedTask,
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
