"use client";
import React from "react";
import { NetworkIcon, Zap } from "lucide-react";
import { RocketIcon } from "@/components/icons/rocket";
import { TeamIcon } from "@/components/icons/team";
import { TaskIcon } from "@/components/icons/task";
import { UserRoundIcon } from "@/components/icons/user-round";

type Props = { type: string };

const CustomIconHandler = ({ type }: Props) => {
  switch (type) {
    case "workspace":
      return <NetworkIcon className="flex-shrink-0 text-primary" size={30} />;
    case "team":
      return <TeamIcon selected />;
    case "project":
      return <RocketIcon selected />;
    case "task":
      return <TaskIcon selected size={40}/>;
    case "member":
      return <UserRoundIcon selected size={40}/>;
    default:
      return <Zap className="flex-shrink-0" size={30} />;
  }
};

export default CustomIconHandler;
