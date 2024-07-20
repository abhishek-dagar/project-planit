"use server";

import { db } from "../db";

export const fetchTiers = async () => {
  "use server";
  try {
    const tiers = await db.tier.findMany({
      orderBy: {
        price: "asc",
      },
    });
    return { tiers };
  } catch (error: any) {
    return { err: error.message };
  }
};
