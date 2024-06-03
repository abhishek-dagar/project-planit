// import { NextRequest } from "next/server";
"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "../db";

export const currentUser = async () => {
  try {
    const token = cookies().get("token")?.value || "";
    if (!token) return null;
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await db.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true,
            tier: true,
            workspaces: true,
            tasks: true,
            teamId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        tier: true,
        workspaces: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            teams: true,
            projects: true,
            tasks: true,
            selected: true,
            users: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                tier: true,
                workspaces: true,
                tasks: true,
                teamId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            owner: true,
            ownerId: true,
          },
        },
        workspaceMembers: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            teams: true,
            projects: true,
            tasks: true,
            selected: true,
            users: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                tier: true,
                workspaces: true,
                tasks: true,
                teamId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            owner: true,
            ownerId: true,
          },
        },
        tasks: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (user?.role?.name === "member") {
      user.workspaces = user.workspaceMembers;
      const manager = await db.user.findFirst({
        where: {
          members: {
            some: {
              id: user?.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      return { ...user, managerId: manager?.id };
    }
    return { ...user, managerId: null };
  } catch (error) {
    return null;
  }
};
