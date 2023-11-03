import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

connectToDB();

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findOne({ _id: userId }).select("-password");
    let members: any[] = [];

    if (!user) {
      NextResponse.json({ message: "Unauthorized Access" }, { status: 201 });
    }

    if (user.role === "manager") {
      members = await User.find({ managerId: userId }).select("-password");
    }

    return NextResponse.json({
      message: "Members found",
      data: members,
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const member = await User.findOne({ _id: reqBody.id }).select("-password");

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Member found",
      data: member,
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
