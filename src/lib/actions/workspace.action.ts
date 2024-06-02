"use server";
import { disconnect } from "process";
import { db } from "../db";
import { currentUser } from "../helpers/getTokenData";

export const createWorkspace = async (workspace: any) => {
  "use server";

  // create workspace
  try {
    const user: any = await currentUser();

    if (!user) return { err: "Failed to create workspace" };
    const newWorkspace = await db.workspace.create({
      data: {
        ...workspace,
        ownerId: user?.id,
        selected: user.workspaces.length === 0 ? true : false,
      },
    });

    if (!newWorkspace) return { err: "Failed to create workspace" };

    return { workspace: newWorkspace };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const updateWorkspace = async (workspace: any, isAdd?: boolean) => {
  "use server";
  try {
    const selectedFilter =
      workspace.selected === undefined
        ? {}
        : isAdd === undefined
        ? {}
        : isAdd
        ? { selected: { connect: { id: workspace.selected } } }
        : { selected: { disconnect: { id: workspace.selected } } };
    const userFilter =
      workspace.users === undefined
        ? {}
        : isAdd === undefined
        ? {}
        : isAdd
        ? { users: { connect: { id: workspace.users } } }
        : { users: { disconnect: { id: workspace.users } } };

    const updatedWorkspace = await db.workspace.update({
      where: {
        id: workspace.id,
      },
      data: {
        ...workspace,
        ...selectedFilter,
        ...userFilter,
      },
    });
    return { workspace: updatedWorkspace };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};
