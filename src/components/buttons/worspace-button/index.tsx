"use server";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import { Button } from "../../ui/button";
import { ChevronsUpDownIcon, SettingsIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Btn } from "./btn";

type Props = {};

const WorkspaceButton = async (props: Props) => {
  const user: any = await currentUser();
  if (!user) redirect("/signin");
  const workspaces = user?.workspaces;
  if (user?.role?.name === "manager" && user.workspaces &&user?.workspaces?.length < 1)
    redirect("/workspace");

  return <Btn workspaces={workspaces} user={user} />;
};

export default WorkspaceButton;
