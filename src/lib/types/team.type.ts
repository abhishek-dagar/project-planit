import { z } from "zod";
import { ProjectType } from "./project.type";
import { UserType } from "./user.types";
import { Team } from "@prisma/client";

export const TeamValidation = z.object({
  name: z.string(),
  description: z.string().min(3).max(1000),
});

export interface TeamType extends Team{}
