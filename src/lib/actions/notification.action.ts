"use server";

import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const fetchNotifications = async ({ read }: { read?: boolean }) => {
  "use server";
  try {
    const user = await currentUser();
    const userId: any = user?.id;
    const readFilter = read !== undefined ? { read: read } : {};
    const notifications = await db.notification.findMany({
      where: {
        toId: userId,
        ...readFilter,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { notifications };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const updateNotification = async (notification: any) => {
  "use server";
  try {
    const updatedNotification = await db.notification.update({
      where: {
        id: notification.id,
      },
      data: notification,
    });
    return { updatedNotification };
  } catch (error: any) {
    return { err: error.message };
  }
};
