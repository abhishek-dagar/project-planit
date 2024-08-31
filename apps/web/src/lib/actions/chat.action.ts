"use server";

import { db } from "../db";
import { pusherServer } from "../pusher";

export const sendMessage = async (message: any) => {
  "use server";
  try {
    const newMessage = await db.chat.create({
      data: {
        ...message,
      },
    });
    // pusherServer.trigger(channel, "message", newMessage);
    return { success: true, err: undefined, message: newMessage };
  } catch {
    return {
      success: false,
      err: "Not able to create activity",
      message: undefined,
    };
  }
};

export const fetchChats = async (fromId: string, toId: string) => {
  "use server";
  try {
    const chats = await db.chat.findMany({
      where: {
        OR: [
          {
            fromId,
            toId,
          },
          {
            fromId: toId,
            toId: fromId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { chats, err: undefined };
  } catch {
    return { chats: [], err: "Not able to fetch chats" };
  }
};

export const fetchInitialContactWithMessages = async (userId: string) => {
  "use server";
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        SenderChat: {
          include: {
            from: true,
            to: true,
          },
        },
        ReciverChat: {
          include: {
            from: true,
            to: true,
          },
        },
      },
    });

    if (!user) return { chats: [], err: "No chats found" };

    const allChats = [...user.SenderChat, ...user.ReciverChat];

    // Create a Map to store the latest chat for each unique user pair
    const latestChatsMap = new Map();

    allChats.forEach((chat) => {
      // Create a key using the sorted IDs of the chat participants to ensure uniqueness
      const participantsKey = [chat.fromId, chat.toId].sort().join("-");

      // Check if this pair already exists in the Map and if the current chat is more recent
      if (
        !latestChatsMap.has(participantsKey) ||
        new Date(chat.createdAt).getTime() >
          new Date(latestChatsMap.get(participantsKey).createdAt).getTime()
      ) {
        latestChatsMap.set(participantsKey, chat);
      }
    });

    // Convert the Map values to an array and sort by the latest chat
    const latestChats = Array.from(latestChatsMap.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return { chats: latestChats, err: undefined };
  } catch {
    return { chats: [], err: "Not able to fetch chats" };
  }
};


