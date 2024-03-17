import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { emailOrUsername, password } = reqBody;

    // Check is User exists or not
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return NextResponse.json({ error: "User Not found" }, { status: 400 });
    }

    // validate password

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Incorrect username or password" },
        { status: 400 }
      );
    }

    const tokenData = {
      ...user,
      id: user._id,
      password: "",
    };

    // create a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
