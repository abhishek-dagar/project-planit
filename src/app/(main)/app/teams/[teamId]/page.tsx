import { Separator } from "@/components/ui/separator";
import { deleteTeam, fetchTeam } from "@/lib/actions/team.action";
import { redirect } from "next/navigation";
import React from "react";
import ChangeName from "./_component/change-name";
import { UserRoundIcon } from "@/components/icons/user-round";
import TeamMembers from "./_component/team-members";
import DeleteConfirmModal from "@/components/common/delete-confirm-modal";
import Link from "next/link";
import { currentUser } from "@/lib/helpers/getTokenData";
import { toast } from "sonner";

const Team = async ({ params }: any) => {
  const { teamId } = params;
  const user = await currentUser();
  if (!user) redirect("/app/signin");
  const { team }: any = await fetchTeam(teamId);
  if (!team) redirect("/app/teams");
  const workspaces = user?.workspaces;
  if (user.role?.name === "manager" && user.workspaces &&user?.workspaces?.length < 1)
    redirect("/workspace");
  const selectedWorkspace = workspaces?.find((workspace: any) =>
    workspace.selected.find((select: any) => select.id === user.id)
  );

  const handleDeleteTeam = async () => {
    "use server";
    try {
      const { deletedTeam } = await deleteTeam(teamId);
      if (deletedTeam) {
        return { success: "Team deleted successfully" };
      }
    } catch (error: any) {
      return { err: error.message };
    }
  };

  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <Link
        href="/app/teams"
        className="absolute top-0 md:top-10 left-2 md:left-10 underline text-muted-foreground"
      >
        {"<"}Back
      </Link>
      <div className="w-[90%] md:w-3/4 mt-4 md:mt-0">
        <h1 className="text-3xl flex gap-2 items-end">
          <UserRoundIcon selected size={50} />
          {team.name}
        </h1>
        <p className="text-muted-foreground">Mange team setting</p>
        <Separator />
      </div>
      <div className="w-[90%] md:w-3/4">
        <h1 className="text-xl">General Settings</h1>
        <ChangeName team={team} />
        <Separator className="mt-2" />
      </div>
      <div className="w-[90%] md:w-3/4">
        <h1 className="text-xl">Team Members</h1>
        <TeamMembers team={team} user={user} workspace={selectedWorkspace} />
        <Separator className="mt-2" />
      </div>
      <div className="w-[90%] md:w-3/4 flex flex-col gap-3 items-start">
        <h1 className="text-xl">Delete Team</h1>
        <p className="text-muted-foreground">Are you sure you want to delete</p>
        <DeleteConfirmModal
          onConfirm={handleDeleteTeam}
          redirectTo="/app/teams"
        />
      </div>
    </div>
  );
};

export default Team;
