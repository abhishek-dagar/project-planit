import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/lib/mongoose/models/team.model";
import Project from "@/lib/mongoose/models/project.model";

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
