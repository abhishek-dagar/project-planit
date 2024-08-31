import React from "react";
import { TeamType } from "@/lib/types/team.type";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoundIcon } from "@/components/icons/user-round";
import moment from "moment";

interface TeamCardProps {
  team: TeamType;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const date: string = moment(team.createdAt || "").format("MMM, YYYY");
  return (
    <Card className="hover:bg-muted scale-95 hover:scale-100 transition-all hover:border-primary">
      <CardHeader className="pb-0">
        <CardTitle className="flex flex-col gap-2">
          <UserRoundIcon selected size={30} />
          <p>{team.name}</p>
        </CardTitle>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-muted-foreground text-xs md:text-sm text-end w-full">
          create at : {date}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
