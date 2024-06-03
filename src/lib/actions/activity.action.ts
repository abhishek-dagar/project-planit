"use server";

import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const createActivity = async (activity: any, projectId: any) => {
  "use server";
  try {
    const user = await currentUser();
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        team: {
          select: {
            members: true,
          },
        },
      },
    });
    if (user?.id && project?.team?.members) {
      const memberIds: { id: string }[] = project?.team?.members?.map(
        (member: any) => ({
          id: member.id,
        })
      );
      memberIds.push({ id: user.id });
      if (user.managerId) {
        memberIds.push({ id: user.managerId });
      }

      const createdActivity = await db.activity.create({
        data: {
          ...activity,
          projectId: projectId,
          changeById: user?.id,
          for: {
            connect: memberIds,
          },
        },
      });
      return { createdActivity };
    }
    return { err: "Not able to create activity" };
  } catch {
    return { err: "Not able to create activity" };
  }
};

export const fetchActivities = async () => {
  "use server";
  try {
    const user = await currentUser();
    const activities = await db.activity.findMany({
      where: {
        for: {
          some: {
            id: user?.id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        changeBy: {
          select: {
            name: true,
          }
        },
        projectId: true,
        taskId: true,
      },
    });
    return { activities };
  } catch {
    return { err: "Not able to fetch activities" };
  }
};
