import Task from "@/lib/mongoose/models/task.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { taskId }: any = context.params;
    const tasks = await Task.find({});
  } catch {}
};
