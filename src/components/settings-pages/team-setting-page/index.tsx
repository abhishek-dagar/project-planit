import DeleteTeamModal from "@/components/modals/delete-team-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Team } from "@/lib/interfacesOrEnum/teams-group";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  team: Team;
}

const TeamSettingsPage = ({ team }: Props) => {
  const [updatedTeam, setUpdatedTeam] = useState<Team>({
    id: "",
    name: "",
    icon: "",
    pinned: false,
    members: "",
    link: "",
    projects: [],
  });

  const handleUpdatedTeam = (e: any) => {
    setUpdatedTeam((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setUpdatedTeam(team);
  }, [team]);

  return (
    <div className="p-2">
      <div>
        <p className="text-[12px] md:text-[12px] font-bold flex items-center gap-2 uppercase">
          Team Name
        </p>
        <div>
          <Input
            name="name"
            className={"py-0 focus-visible:ring-1 bg-secondary-background"}
            clName={"h-7 w-60"}
            value={updatedTeam.name}
            onChange={handleUpdatedTeam}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <p className="text-[24px]">Members</p>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <p className="text-[24px]">Danger Zone</p>
        <div className="border border-red-500 rounded-md p-4">
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div>
              <p className="text-[18px] font-bold">Delete this Team</p>
              <p className="text-[12px] font-medium">
                Once you delete a team, there is no going back, loose all
                projects & tasks, Please be certain.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-secondary-background border border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white">
                  Delete this Team
                </Button>
              </DialogTrigger>
              <DeleteTeamModal team={team} />
            </Dialog>
          </div>
        </div>
      </div>
      <Button variant={"secondary"} className="hover:ring-2 hover:ring-primary">
        <Save size={14} className="mr-2" />
        Save Changes
      </Button>
    </div>
  );
};

export default TeamSettingsPage;
