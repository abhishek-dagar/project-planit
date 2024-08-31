import { Chat } from "@prisma/client";
import { UserType } from "./user.types";

export interface ChatType extends Omit<Chat, "id" | "createdAt" | "updatedAt"> {
  id?: string;
  from?: UserType;
  to?: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
}
