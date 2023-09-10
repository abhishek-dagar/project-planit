import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Pricing from "@/lib/mongoose/models/pricing.model";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { price, title, features, description, additionalFeature } = reqBody;

    const oldPrice = await Pricing.findOne({ price });
    if (oldPrice) {
      return NextResponse.json(
        { message: "Price already exists" },
        { status: 202 }
      );
    }

    const newPricing = new Pricing({
      price,
      title,
      features,
      description,
      additionalFeature,
    });

    await newPricing.save();

    return NextResponse.json(
      { message: "Pricing created Successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    let pricingData = await Pricing.find({});
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

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      price,
      newPrice,
      title,
      features,
      description,
      additionalFeature,
      disabled,
    } = reqBody;

    await Pricing.findOneAndUpdate(
      { price },
      {
        price: newPrice,
        title,
        features,
        description,
        additionalFeature,
        disabled,
      }
    );

    return NextResponse.json(
      { message: "Pricing updated Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
