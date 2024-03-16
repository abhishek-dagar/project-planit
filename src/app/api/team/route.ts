import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/lib/mongoose/models/team.model";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import User from "@/lib/mongoose/models/user.model";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const newTeam = new Team({
      ...reqBody,
    });

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    user.teams.push(newTeam);
    await newTeam.save();
    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json(
      {
        message: "Team created Successfully",
        success: true,
        team: { ...newTeam._doc, id: newTeam._id },
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

    const team = await Team.findById(reqBody.id);
    if (!team) {
      return NextResponse.json(
        { message: "Team Not found", success: false },
        { status: 404 }
      );
    }
    const projects = reqBody.projects.map((project: any) => project.id);
    const members = reqBody.members.map((member: any) => member.id);
    if (team.members?.length < reqBody.members?.length) {
      const count = reqBody.members?.length - team.members?.length - 1;
      reqBody.members.map(async (member: any, index: number) => {
        if (index >= count) {
          const user = await User.findByIdAndUpdate(member.id, { ...member });
          if (!user) {
            return NextResponse.json(
              { message: "Failed to add member", success: false },
              { status: 404 }
            );
          }
        }
      });
    }
    const teamLead = reqBody.teamLead?.id;

    const updatedTeam = await Team.findByIdAndUpdate(reqBody.id, {
      ...reqBody,
      projects,
      members,
      teamLead,
    });

    return NextResponse.json(
      {
        message: "Team updated Successfully",
        success: true,
        team: updatedTeam,
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
