import * as z from "zod";
import { WorkspaceType } from "./workspace.type";
import { PriceDetailType } from "./price.type";
import { Role, User } from "@prisma/client";
import { TeamType } from "./team.type";
import { NotificationType } from "./notification.type";
import { ActivityType } from "./activity.type";

export const UserRegisterValidation = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(1000),
    confirmPassword: z.string().min(8).max(1000),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
export const UserSignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(1000),
});

export const UserProfileValidation = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
});

export const MemberRegisterValidation = z
  .object({
    email: z.string().email(),
    role: z.string(),
    managerId: z.string(),
    tierId: z.string(),
    password: z.string().min(8).max(1000),
    confirmPassword: z.string().min(8).max(1000),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const UpdatePasswordValidation = z
  .object({
    oldPassword: z.string().min(8).max(1000),
    newPassword: z.string().min(8).max(1000),
    confirmPassword: z.string().min(8).max(1000),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The new passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export interface UserType extends Omit<User, "password"> {
  NotificationReciver?: NotificationType[];
  NotificationSender?: NotificationType[];
  OpenedWorkspace?: WorkspaceType[];
  activityFor?: ActivityType[];
  activity?: ActivityType[];
  role: RoleType | null;
  members: UserType[];
  workspaces: WorkspaceType[];
  workspaceMembers?: UserType[];
  PaymentHistory?: PriceDetailType[];
  team?: TeamType;
  manager?: UserType;
}

export interface RoleType extends Role {}

enum Permissions {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
