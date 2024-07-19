"use server";

import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const createTeam = async (team: any) => {
  "use server";
  try {
    const user: any = await currentUser();
    if (!user) return { err: "Failed to create team" };

    let count = 0;
    for (const workspace of user?.workspaces) {
      for (const _ of workspace?.teams) {
        count++;
      }
    }

    if (count === 1 && user?.tier.name.toLowerCase() === "free") {
      return {
        err: "Upgrade your account to create more teams",
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

    if (!currentWorkspace) {
      return { err: "Failed to create team" };
    }
    const newTeam = await db.team.create({
      data: { ...team, workspaceId: currentWorkspace?.id },
    });
    return { team: newTeam };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchTeams = async () => {
  "use server";
  try {
    const user: any = await currentUser();

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
    if (currentWorkspace) {
      const teams = await db.team.findMany({
        where: {
          workspaceId: currentWorkspace?.id,
        },
      });
      return { teams };
    }
    return { teams: [] };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const fetchTeam = async (teamId: string) => {
  "use server";
  try {
    const team = await db.team.findFirst({
      where: {
        id: teamId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        teamLead: true,
        teamLeadId: true,
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
            createdAt: true,
            updatedAt: true,
            teamsLead: true,
            teamId: true,
          },
        },
      },
    });
    return { team };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const updateTeam = async (team: any) => {
  "use server";
  try {
    const updatedTeam = await db.team.update({
      where: {
        id: team.id,
      },
      data: team,
    });
    return { updatedTeam };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};

export const addNewMemberToTeam = async (data: any) => {
  "use server";
  try {
    const addedMember = await db.team.update({
      where: {
        id: data.id,
      },
      data: {
        members: {
          connect: {
            id: data.member.id,
          },
        },
      },
    });

    return { addedMember };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const removeMemberFromTeam = async (
  data: any,
  teamLeadId: string | null
) => {
  "use server";
  try {
    const removedMember = await db.team.update({
      where: {
        id: data.id,
      },
      data: {
        teamLeadId: teamLeadId,
        members: {
          disconnect: {
            id: data.member.id,
          },
        },
      },
    });

    return { removedMember };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const deleteTeam = async (teamId: string) => {
  "use server";
  try {
    const deletedTeam = await db.team.delete({
      where: {
        id: teamId,
      },
    });
    return { deletedTeam };
  } catch (error: any) {
    return { err: error.message };
  }
};
