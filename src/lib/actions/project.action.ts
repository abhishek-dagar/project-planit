"use server";

import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const createProject = async (project: any) => {
  "use server";
  try {
    const user: any = await currentUser();
    let count = 0;
    for (const workspace of user?.workspaces) {
      for (const _ of workspace?.projects) {
        count++;
      }
    }

    if (count === 5 && user?.tier.name.toLowerCase() === "free") {
      return {
        err: "Upgrade your account to create more projects",
        tier: user?.tier,
      };
    }
    const currentWorkspace = await db.workspace.findFirst({
      where: {
        ownerId: user?.id,
        selected: {
          some: {
            id: user?.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    const newProject = await db.project.create({
      data: { ...project, workspaceId: currentWorkspace?.id },
    });
    return { project: newProject };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchProjects = async () => {
  "use server";
  try {
    const user: any = await currentUser();
    const currentWorkspace = await db.workspace.findFirst({
      where: {
        ownerId: user?.managerId ? user?.managerId : user?.id,
        selected: {
          some: {
            id: user?.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (!currentWorkspace) return { projects: [] };
    const teamFilter =
      user?.role?.name === "member"
        ? {
            team: {
              members: {
                some: {
                  id: user?.id,
                },
              },
            },
          }
        : {};

    const projects = await db.project.findMany({
      where: {
        workspaceId: currentWorkspace?.id,
        ...teamFilter,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { projects };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchProject = async (projectId: string | null) => {
  "use server";
  try {
    if (!projectId) return;
    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
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
    });
    return { project };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const updateProject = async (project: any) => {
  "use server";
  try {
    delete project["team"];
    const updatedProject = await db.project.update({
      where: {
        id: project.id,
      },
      data: project,
    });
    return { updatedProject };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};

export const deleteProject = async (projectId: string) => {
  "use server";
  try {
    const deletedProject = await db.project.delete({
      where: {
        id: projectId,
      },
    });
    return { deletedProject };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};
