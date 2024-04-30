import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/lib/mongoose/models/team.model";
import Project from "@/lib/mongoose/models/project.model";
import Task from "@/lib/mongoose/models/task.model";
import Comment from "@/lib/mongoose/models/comment.model";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { teamId }: any = context.params;

    let team = await Team.findById(teamId).populate({
      path: "projects",
      model: Project,
    });
    if (!team) {
      return NextResponse.json(
        { message: "Failed to fetch team", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "teamFetched", data: team, success: true },
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
    const { teamId }: any = context.params;
    const team = await Team.findById(teamId);
    team.projects.forEach(async (project: any) => {
      const projectObj = await Project.findById(project);
      projectObj.tasks.forEach(async (task: any) => {
        const taskObj = await Task.findById(task);
        taskObj.comments.forEach(async (comment: any) => {
          await Comment.deleteOne({ _id: comment });
        });
        await Task.deleteOne({ _id: task });
      });
      await Project.deleteOne({ _id: project });
    });
    await Team.deleteOne({ _id: teamId });
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
