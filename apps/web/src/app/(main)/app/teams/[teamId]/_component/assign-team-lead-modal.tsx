import { useMediaQuery } from "@/components/custom-hooks/media-query";
import { UserRoundIcon } from "@/components/icons/user-round";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { updateTeam } from "@/lib/actions/team.action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface AssignTeamLeadModalProps {
  team: any;
}
const AssignTeamLeadModal = ({ team }: AssignTeamLeadModalProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Assign Team Lead</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member toTeam</DialogTitle>
            <DialogDescription>Add member to the team</DialogDescription>
          </DialogHeader>
          {/* <TeamForm setOpen={setOpen} /> */}
          <MemberSelector
            members={team?.members}
            team={team}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Assign Team Lead</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="border-t p-4">
          <MemberSelector
            members={team?.members}
            team={team}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MemberSelector = ({ members, team, setOpen }: any) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleAssignTeamLeadMembers = async (memberId: string) => {
    try {
      const { updatedTeam } = await updateTeam({
        id: team?.id,
        teamLeadId: memberId,
      });
      if (updatedTeam) {
        toast.success("Members successfully made team lead");
        router.refresh();
      } else {
        toast.error("Failed to make members team lead");
      }
    } catch (err) {
      toast.error("Failed to make members team lead");
    }
  };

  const checkIsTeamLead = (memberId: string) => {
    if (team?.teamLeadId === memberId) return true;
    return false;
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search member by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Card>
        <CardContent className="flex flex-col gap-2 pb-2 px-2 max-h-[300px] overflow-auto">
          <div className="px-2 pt-2 sticky top-0 bg-black/10 backdrop-blur-lg">
            <p className="text-lg px-2 truncate">Members</p>
            <p className="text-sm text-muted-foreground">
              Only three members are visible in suggestion but you can search
            </p>
          </div>
          {members
            ?.filter(
              (member: any) =>
                member.name.includes(search) || member.email.includes(search)
            )
            .map((member: any, index: number) => {
              // if (index > 2) return null;
              return (
                <div
                  key={member.id}
                  className={` flex justify-between items-center gap-2`}
                >
                  <div className="flex gap-1 items-center">
                    <UserRoundIcon selected size={16} />
                    <p>{member.name}</p>
                  </div>
                  <p className="text-muted-foreground">{member.email}</p>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      handleAssignTeamLeadMembers(
                        checkIsTeamLead(member.id) ? null : member.id
                      )
                    }
                  >
                    {checkIsTeamLead(member.id)
                      ? "Remove teamLead"
                      : "Assign Team Lead"}
                  </Button>
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignTeamLeadModal;
