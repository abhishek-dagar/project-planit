import { z } from "zod";
import { UserType } from "./user.types";
import { TeamType } from "./team.type";
import { ProjectType } from "./project.type";

export const workspaceValidation = z.object({
  name: z.string(),
  description: z.string(),
});

export interface WorkspaceType extends z.infer<typeof workspaceValidation> {
  id: string;
  teams: TeamType[];
  projects: ProjectType[];
  members: UserType[];
  owner: UserType;
  tasks: string[];
  createdAt: Date;
  updatedAt: Date;
  selected: boolean;
}
