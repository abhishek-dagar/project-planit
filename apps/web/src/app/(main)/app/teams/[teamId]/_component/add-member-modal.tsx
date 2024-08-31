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
import { addNewMemberToTeam } from "@/lib/actions/team.action";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface AddMemberModalProps {
  user: any;
  team: any;
  workspace: any;
}
const AddMemberModal = ({ user, team, workspace }: AddMemberModalProps) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member toTeam</DialogTitle>
            <DialogDescription>Add member to the team</DialogDescription>
          </DialogHeader>
          {/* <TeamForm setOpen={setOpen} /> */}
          <MemberSelector
            members={workspace?.users}
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
        <Button variant={"outline"}>Add member</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="border-t p-4">
          <MemberSelector
            members={workspace?.users}
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
  const [selectedMembers, setSelectedMembers] = useState<any>([]);
  const router = useRouter();
  const handleSelect = (value: any) => {
    setSelectedMembers((prev: any) => {
      const mem = prev?.find((member: any) => member.id === value.id);
      if (mem) return prev.filter((member: any) => member.id !== value.id);
      return [...(prev || []), value];
    });
  };

  const handleRemove = (value: any) => {
    setSelectedMembers((prev: any) => {
      return prev.filter((member: any) => member.id !== value.id);
    });
  };

  const addMembers = async () => {
    try {
      let flag: boolean = true;
      selectedMembers.map(async (member: any) => {
        const { addedMember } = await addNewMemberToTeam({
          id: team?.id,
          member,
        });
        if (!addedMember) flag = false;
      });
      if (flag) {
        toast.success("Members added successfully");
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to add members1");
      }
    } catch (err) {
      toast.error("Failed to add members");
    }
  };

  const checkSelected = (value: any) => {
    return selectedMembers.find((member: any) => member.id === value.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search member by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {selectedMembers?.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p>Selected Members</p>
            <Button
              variant={"outline"}
              className="py-0 text-xs rounded-full"
              onClick={addMembers}
            >
              Add
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedMembers.map((member: any) => (
              <Badge
                variant={"secondary"}
                className="flex gap-2"
                key={member.id}
              >
                {member.name}
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-0 h-4 w-4"
                  onClick={() => handleRemove(member)}
                >
                  <XIcon size={14} />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      <Card>
        <CardContent className="flex flex-col gap-2 pb-2 px-2 max-h-[300px] overflow-auto">
          <div className="px-2 pt-2 sticky top-0 bg-black/10 backdrop-blur-lg">
            <p className="text-lg px-2 truncate">Members this workspace</p>
            <p className="text-sm text-muted-foreground px-2 truncate">
              Only three members are visible in suggestion but you can search
            </p>
          </div>
          {members?.filter(
            (member: any) =>
              member.name.includes(search) || member.email.includes(search)
          ).length > 0 ? (
            members
              ?.filter(
                (member: any) =>
                  member.name.includes(search) || member.email.includes(search)
              )
              .map((member: any, index: number) => {
                if (member.role.name === "co manager") return null;
                return (
                  <Button
                    variant={"ghost"}
                    key={member.id}
                    disabled={member.teamId}
                    className={`justify-start gap-2 ${
                      checkSelected(member)
                        ? "bg-muted text-muted-foreground"
                        : ""
                    }`}
                    onClick={() => handleSelect(member)}
                  >
                    <UserRoundIcon selected size={16} />
                    <p>{member.name}</p>
                    <p className="text-muted-foreground">{member.email}</p>
                    {member.teamId && (
                      <p className="text-muted-foreground truncate">
                        Already in a team
                      </p>
                    )}
                  </Button>
                );
              })
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              No members found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMemberModal;
