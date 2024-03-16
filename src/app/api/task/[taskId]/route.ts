import Task from "@/lib/mongoose/models/task.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { taskId }: any = context.params;
    const tasks = await Task.find({});
    return NextResponse.json(
      { message: "project fetched", data: {}, success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "project fetched" }, { status: 500 });
  }
};
