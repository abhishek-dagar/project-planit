import { TeamIcon } from "@/components/icons/team";
import React from "react";
import TeamCard from "./_components/team-card";
import { CreateNewTeamModal } from "./_components/new-team-modal";
import { fetchTeams } from "@/lib/actions/team.action";
import Link from "next/link";

const Teams = async () => {
  const { teams }: any = await fetchTeams();

  return (
    <div
      className={`flex flex-col gap-4 relative ${
        teams?.length > 0 ? "" : "h-full"
      }`}
    >
      <div className="sticky top-0 z-[10] py-1 md:py-3 px-6 bg-background/50 backdrop-blur-lg flex items-center justify-between border-b">
        <h1 className="text-xl md:text-4xl flex items-center">
          <TeamIcon selected={true} size={30} className="mr-2" />
          Teams
        </h1>
        {/* <Button variant={"secondary"}>Create Team</Button> */}
        <CreateNewTeamModal />
      </div>
      {teams?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
          {teams?.map((team: any) => (
            <Link key={team.id} href={`/app/teams/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <TeamIcon selected={true} size={60} />
          <h1>You have no teams</h1>
          <p className="text-muted-foreground">Create new team</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
