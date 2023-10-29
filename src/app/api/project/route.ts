import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/lib/mongoose/models/team.model";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import User from "@/lib/mongoose/models/user.model";
import Project from "@/lib/mongoose/models/project.model";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const team = await Team.findById(reqBody.teamId);
    if (!team)
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    const newProject = new Project({
      ...reqBody,
    });
    if (team.projects) {
      team.projects.push(newProject);
    } else {
      team.projects = [newProject];
    }
    await newProject.save();
    await Team.findByIdAndUpdate(reqBody.teamId, team);

    return NextResponse.json(
      {
        message: "Project created Successfully",
        success: true,
        project: { ...newProject._doc, id: newProject._id },
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

    const project = await Project.findById(reqBody.id);
    if (!project) {
      return NextResponse.json(
        { message: "project Not found", success: false },
        { status: 404 }
      );
    }

    const tasks: any = reqBody.tasks.map((tasks: any) => tasks.id);

    const updatedProject = await Project.findByIdAndUpdate(reqBody.id, {
      ...reqBody,
      tasks,
    });

    return NextResponse.json(
      {
        message: "project updated Successfully",
        success: true,
        project: updatedProject,
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
