import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if user already exists
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        members: true,
        tier: true,
        workspaces: true,
        tasks: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email or password is wrong", success: false },
        { status: 404 }
      );
    }

    // validate password
    const isValidPassword = await bycryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Email or password is wrong", success: false },
        { status: 404 }
      );
    }
    // create token data
    const tokenData = {
      id: user.id,
      role: user?.role,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "User signed in successfully", success: true },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
