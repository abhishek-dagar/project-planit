import { pusherServer } from "@/lib/pusher";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.text();
    const [socketId, channelName] = data
      .split("&")
      .map((str) => str.split("=")[1]);

    const id = nanoid();

    const presenceData = {
      user_id: id,
      user_data: { user_id: id },
    };

    const auth = pusherServer.authorizeChannel(
      socketId,
      channelName,
      presenceData
    );

    return NextResponse.json(JSON.stringify(auth));
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
