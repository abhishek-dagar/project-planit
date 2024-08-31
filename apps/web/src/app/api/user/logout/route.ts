import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
