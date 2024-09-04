import { z } from "zod";
import { Project } from "@prisma/client";

export interface ProjectType extends Project {}

export const ProjectValidation = z.object({
  name: z.string(),
  description: z.string().min(3).max(1000),
  teamId: z.optional(z.string()),
});

export enum ProjectStatus {
  TODO,
  IN_PROGRESS,
  PAUSED,
  BACKLOG,
  CLOSED,
  CANCELLED,
}
export enum ProjectStatusColor {
  TODO = "#1267d8",
  IN_PROGRESS = "#7f77f1",
  PAUSED = "#791dd9",
  BACKLOG = "#d8d8d8",
  CLOSED = "#6bc950",
  CANCELLED = "#af2d1f",
}
