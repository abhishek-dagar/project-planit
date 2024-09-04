import { z } from "zod";
import { UserType } from "./user.types";
import { TeamType } from "./team.type";
import { ProjectType } from "./project.type";
import { workspace } from "@prisma/client";

export const workspaceValidation = z.object({
  name: z.string(),
  description: z.string(),
});

export interface WorkspaceType extends workspace{}
