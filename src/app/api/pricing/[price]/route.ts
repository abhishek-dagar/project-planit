import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Pricing from "@/lib/mongoose/models/pricing.model";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { price }: any = context.params;

    let pricingData = await Pricing.findOne({ price });
    if (!pricingData) {
      return NextResponse.json(
        { message: "Failed to fetch pricing data" },
        { status: 404 }
      );
    }
    return NextResponse.json({ pricingData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
