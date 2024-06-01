"use server";
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

export const updateWorkspace = async (workspace: any) => {
  "use server";
  try {
    const updatedWorkspace = await db.workspace.update({
      where: {
        id: workspace.id,
      },
      data: workspace,
    });
    return { workspace: updatedWorkspace };
  } catch (error: any) {
    console.log(error.message);

    return { err: error.message };
  }
};
