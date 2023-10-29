import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import Pricing from "@/lib/mongoose/models/pricing.model";
import Team from "@/lib/mongoose/models/team.model";
import Project from "@/lib/mongoose/models/project.model";
import Task from "@/lib/mongoose/models/task.model";

connectToDB();

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findOne({ _id: userId })
      .select("-password")
      .populate({ path: "currentPlan", model: Pricing })
      .populate({
        path: "teams",
        model: Team,
        populate: {
          path: "projects",
          model: Project,
          populate: {
            path: "tasks",
            model: Task,
          },
        },
      });
    return NextResponse.json({
      message: "User found",
      data: user,
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
