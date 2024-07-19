"use server";

import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const addPayment = async (payment: any) => {
  "use server";
  try {
    const user: any = await currentUser();
    const tier = await db.tier.findFirst({
      where: {
        price: payment.plan,
      },
    });

    if (!tier) {
      return { err: "Tier not found" };
    }
    delete payment.plan;
    const newPayment = await db.paymentHistory.create({
      data: { ...payment, user: { connect: { id: user.id } } },
    });

    if (!newPayment) {
      return { err: "Failed to create payment" };
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        tier: {
          connect: { id: tier.id },
        },
      },
    });

    if (!updatedUser) {
      return { err: "Failed to update user" };
    }

    let success = true;
    user.members.map(async (member: any) => {
      const newPayment = await db.paymentHistory.create({
        data: {
          ...payment,
          user: { connect: { id: member.id } },
        },
      });

      if (!newPayment) {
        success = false;
      }
      const updatedUser = await db.user.update({
        where: { id: member.id },
        data: {
          tier: {
            connect: { id: tier.id },
          },
        },
      });

      if (!updatedUser) {
        success = false;
      }
    });
    if (!success) {
      return { err: "Failed to create payment" };
    }
    return { success: "Payment added successfully" };
  } catch (error: any) {
    console.log(error.message);
    
    return { err: error.message };
  }
};
