import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  //  console.log(order);
  return NextResponse.json({ orderId: "" }, { status: 200 });
}
