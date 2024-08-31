"use server";

import { db } from "../db";

export const fetchUserProfile = async (userId: string) => {
  "use server";
  try {
    const user: any = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return { user, err: undefined };
    }
    return { user: undefined, err: "Failed to fetch user profile" };
  } catch (error: any) {
    return { user: undefined, err: error.message };
  }
};

export const notifyUserStatus = async (
    id: string,
    data: { id: string; status: boolean }
  ) => {
    "use server";
    await db.user.update({
      where: {
        id,
      },
      data: {
        isOnline: data.status,
      },
    });
    // await pusherServer.trigger(id, "user-status", data);
  };
