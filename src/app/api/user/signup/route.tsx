import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // Check if user already exists
    const userTest = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userTest) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bycryptjs.genSalt(12);
    const hashedPassword = await bycryptjs.hash(password, salt);

    // Create user
    const tier = await db.tier.findFirst({
      where: {
        name: "free",
      },
    });
    const newRole = await db.role.findFirst({
      where: {
        name: role ? role : "manager",
      },
    });

    if (!tier || !newRole) {
      return NextResponse.json(
        { message: "Internal Server Error", success: false },
        { status: 500 }
      );
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        tierId: tier?.id,
        roleId: newRole?.id,
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
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Failed to create user", success: false },
        { status: 400 }
      );
    }

    // Generate JWT
    const tokenData = {
      ...user,
      password: undefined,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "User created successfully", success: true },
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
