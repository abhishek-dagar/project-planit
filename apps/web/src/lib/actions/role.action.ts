"use server";

import { db } from "../db";

export const fetchRoles = async () => {
  "use server";
  try {
    const roles = await db.role.findMany();
    return { roles };
  } catch (error: any) {
    return { err: error.message };
  }
};
