import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    if (reqBody.newPassword) {
      const { oldPassword, newPassword, confirmPassword } = reqBody;
      const member = await User.findById(reqBody.id);
      const isValidUser = await member.isValidPassword(oldPassword);
      if (!isValidUser) {
        return NextResponse.json(
          { message: "Invalid password", success: false },
          { status: 401 }
        );
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Passwords do not match", success: false },
          { status: 401 }
        );
      }
      await member.setPassword(newPassword);
      await member.save();
      if (member) {
        return NextResponse.json({
          message: "Password updated successfully",
          success: true,
        });
      }
    }
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
