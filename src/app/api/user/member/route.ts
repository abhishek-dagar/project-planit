import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const member = await User.findByIdAndUpdate(reqBody.id, reqBody);
    if (member) {
      return NextResponse.json({
        message: "Member found",
        data: member,
        success: true,
      });
    }
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
