import { Task } from "@prisma/client";
import {
  BanIcon,
  Circle,
  LoaderIcon,
  LucideCircleCheckBig,
  LucideIcon,
  ShieldAlertIcon,
  SignalHighIcon,
  SignalLowIcon,
  SignalMediumIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react";
import { z } from "zod";

export const TaskCreateValidation = z.object({
  title: z.string().min(3).max(100),
});

export interface TaskType extends Task {}

export enum TaskStatus {
  BACKLOG,
  TODO,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}
export const TaskStatusColor: { [key: string]: string } = {
  BACKLOG: "#bec2c8",
  TODO: "#bec2c8",
  IN_PROGRESS: "#7f77f1",
  COMPLETED: "#6bc950",
  CANCELLED: "#af2d1f",
};
export const TaskStatusIcon: { [key: string]: LucideIcon } = {
  BACKLOG: LoaderIcon,
  TODO: Circle,
  IN_PROGRESS: TimerIcon,
  COMPLETED: LucideCircleCheckBig,
  CANCELLED: XCircleIcon,
};

export enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT,
  NONE,
}
export const TaskPriorityColor: { [key: string]: string } = {
  LOW: "#bec2c8",
  MEDIUM: "#6dd9fa",
  HIGH: "#d9da07",
  URGENT: "#af2d1f",
  NONE: "#bec2c8",
};
export const TaskPriorityIcon: { [key: string]: LucideIcon } = {
  LOW: SignalLowIcon,
  MEDIUM: SignalMediumIcon,
  HIGH: SignalHighIcon,
  URGENT: ShieldAlertIcon,
  NONE: BanIcon,
};
