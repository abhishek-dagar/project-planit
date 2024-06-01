"use server";

import { group } from "console";
import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const createTask = async (task: any) => {
  "use server";
  try {
    const newTask = await db.task.create({ data: task });
    return { newTask };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchTasks = async (
  projectId: string,
  groupBy?: string,
  statuses?: any,
  priorities?: any,
  dueDate?: any,
  assignees?: any
) => {
  "use server";
  try {
    let tasks = [];
    const filterAssignee =
      assignees?.length > 0
        ? {
            assigneeId: { in: assignees },
          }
        : {};
    const filterDueDate = dueDate
      ? {
          dueDate: { lte: dueDate },
        }
      : {};
    tasks = await db.task.findMany({
      where: {
        projectId,
        status: { in: statuses },
        priority: { in: priorities },
        ...filterAssignee,
        ...filterDueDate,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        projectId: true,
        dueDate: true,
        assignee: true,
      },
      orderBy: {
        title: "desc",
      },
    });
    if (groupBy && groupBy !== "") {
      tasks = tasks.reduce((acc: any, task: any) => {
        (acc[task[`${groupBy}`]] = acc[task[`${groupBy}`]] || []).push(task);
        return acc;
      }, {});
    }

    return { tasks };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchAllTasks = async (
  projectIds: string[] | undefined,
  dueDate?: any
) => {
  "use server";
  try {
    if (!projectIds) return { tasks: [] };
    const filterDueDate = dueDate
      ? {
          dueDate: { lte: dueDate },
        }
      : {};
    const tasks = await db.task.findMany({
      where: {
        projectId: { in: projectIds },
        ...filterDueDate,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            teamId: true,
            workspaceId: true,
            selected: true,
            favorite: true,
            status: true,
            team: {
              select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                teamLead: true,
                members: true,
              },
            },
          },
        },
        dueDate: true,
        assignee: true,
      },
      orderBy: {
        title: "desc",
      },
    });
    return { tasks };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const updateTask = async (
  id: string,
  task: any,
  assigneeName?: string
) => {
  "use server";
  try {
    const updatedTask = await db.task.update({
      where: {
        id: id,
      },
      data: task,
    });
    const user = await currentUser();
    const userId: any = user?.id;
    if (task.assigneeId) {
      const assigneeId: any = task.assigneeId;
      await db.notification.create({
        data: {
          to: {
            connect: {
              id: assigneeId,
            },
          },
          from: {
            connect: {
              id: userId,
            },
          },
          title: `Task updated`,
          description: `${updatedTask.title} has been assigned to you`,
        },
      });
      await db.notification.create({
        data: {
          to: {
            connect: {
              id: userId,
            },
          },
          from: {
            connect: {
              id: userId,
            },
          },
          title: `Task updated`,
          description: `${updatedTask.title} has been assigned to ${assigneeName}`,
        },
      });
    }
    return { updatedTask };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};

export const deleteTask = async (id: string) => {
  "use server";
  try {
    const deletedTask = await db.task.delete({
      where: {
        id: id,
      },
    });
    return { deletedTask };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};
