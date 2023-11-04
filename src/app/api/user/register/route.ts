import { connectToDB } from "@/lib/mongoose/mongoose";
import User from "@/lib/mongoose/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Pricing from "@/lib/mongoose/models/pricing.model";

connectToDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, username, password, price } = reqBody;

    // Check is User exists or not
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    let currentPlan;
    if (reqBody.price) {
      currentPlan = await Pricing.findOne({ price });
    } else {
      currentPlan = await Pricing.findOne({ price: 0 });
    }

    const newUser = new User({ ...reqBody, currentPlan });
    if (reqBody.managerId) {
      const manager: any = await User.findById(reqBody.managerId);
      if (!manager) {
        return NextResponse.json(
          { message: "Manager not found" },
          { status: 500 }
        );
      }

      if (!manager.members) {
        manager.members = [newUser];
      } else {
        manager.members.push(newUser);
      }
      await User.findByIdAndUpdate(manager._id, manager);
    }

    // create hash password
    await newUser.setPassword(password);

    await newUser.save();

    return NextResponse.json(
      { message: "User created Successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
