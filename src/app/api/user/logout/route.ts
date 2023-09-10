import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
