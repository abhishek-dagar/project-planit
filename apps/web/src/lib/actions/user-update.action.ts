"use server";

import { db } from "../db";
import bycryptjs from "bcryptjs";

export const updateUser = async (user: any, workspaceIds?: string[]) => {
  "use server";
  try {
    const role = await db.role.findFirst({
      where: {
        name: user.role,
      },
    });
    if (!role) {
      return { err: "Invalid role" };
    }
    user.roleId = role?.id;
    const roleName: string = role.name;
    delete user["role"];
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
    if (updatedUser) {
      if (roleName === "member") {
        workspaceIds?.forEach(async (workspaceId: string) => {
          await db.workspace.update({
            where: {
              id: workspaceId,
            },
            data: {
              users: {
                disconnect: {
                  id: user.id,
                },
              },
            },
          });
        });
      } else {
        workspaceIds?.forEach(async (workspaceId: string) => {
          await db.workspace.update({
            where: {
              id: workspaceId,
            },
            data: {
              users: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        });
      }
    }
    return { updatedUser };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};

export const updateUserPassword = async (user: any) => {
  "use server";
  try {
    const oldUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!oldUser) {
      return { err: "User not found" };
    }
    const isValidPassword = await bycryptjs.compare(
      user.oldPassword,
      oldUser.password
    );
    if (!isValidPassword) {
      return { err: "Invalid old password" };
    }
    const salt = await bycryptjs.genSalt(12);
    const hashedPassword = await bycryptjs.hash(user.newPassword, salt);

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { updatedUser };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};

export const addNewMember = async (
  user: any,
  workspaceIds: string[],
  selectedWorkspaceId: string
) => {
  "use server";
  try {
    // Check if member already exists
    const member = await db.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (member) {
      return { err: "Member already exists" };
    }

    // Fetch tier and role
    const tier = await db.tier.findFirst({
      where: {
        id: user.tierId,
      },
    });

    const role = await db.role.findFirst({
      where: {
        name: user.role,
      },
    });

    if (!tier || !role) {
      return { err: "Failed to fetch role" };
    }

    // Hash password
    const salt = await bycryptjs.genSalt(12);
    const hashedPassword = await bycryptjs.hash(user.password, salt);

    // Create new member
    const newMember = await db.user.create({
      data: {
        email: user.email,
        name: user.email.split("@")[0],
        password: hashedPassword,
        tierId: tier?.id,
        roleId: role?.id,
      },
    });

    // Connect new member to the manager
    await db.user.update({
      where: {
        id: user.managerId,
      },
      data: {
        members: {
          connect: {
            id: newMember.id,
          },
        },
      },
    });

    // Connect new member to the workspaces
    workspaceIds.forEach(async (workspaceId) => {
      await db.workspace.update({
        where: {
          id: workspaceId,
        },
        data: {
          users: {
            connect: {
              id: newMember.id,
            },
          },
        },
      });
    });

    // Connect new member to the selected workspace
    await db.workspace.update({
      where: {
        id: selectedWorkspaceId,
      },
      data: {
        selected: {
          connect: {
            id: newMember.id,
          },
        },
      },
    });

    return { newMember };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const removeMember = async (user: any) => {
  "use server";
  try {
    await db.user.delete({
      where: {
        id: user.id,
      },
    });
    return { removed: true };
  } catch (error: any) {
    console.log(error.message);
  }
};
