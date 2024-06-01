import { z } from "zod";
import { ProjectType } from "./project.type";
import { UserType } from "./user.types";

export const TeamValidation = z.object({
  name: z.string(),
  description: z.string().min(3).max(1000),
});

export interface TeamType {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  members: UserType[];
  projects: ProjectType[];
  workspaceId: string;
}
