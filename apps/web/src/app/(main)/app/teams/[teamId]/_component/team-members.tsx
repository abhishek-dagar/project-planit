"use client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AtSignIcon,
  EllipsisIcon,
  RectangleEllipsisIcon,
  SearchIcon,
  ShieldCheckIcon,
  Trash2Icon,
  WholeWordIcon,
} from "lucide-react";
import { useState } from "react";
import AddMemberModal from "./add-member-modal";
import AssignTeamLeadModal from "./assign-team-lead-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { removeMemberFromTeam } from "@/lib/actions/team.action";
import { toast } from "sonner";

type Props = {
  team: any;
  user: any;
  workspace: any;
};

const TeamMembers = ({ team, user, workspace }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Input
            placeholder="search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            frontIcon={
              <SearchIcon size={14} className="text-muted-foreground" />
            }
            className="bg-muted"
          />
        </div>
        <div className="flex gap-4">
          <AssignTeamLeadModal team={team} />
          <AddMemberModal user={user} team={team} workspace={workspace} />
        </div>
      </div>
      <ScrollArea className="h-[400px] relative">
        <div className="flex flex-col sticky top-0 left-0">
          <Header />
        </div>
        <div className="flex flex-col">
          {team.members
            .filter(
              (member: any) =>
                member.name.includes(search) || member.email.includes(search)
            )
            .map((member: any, index: number) => (
              <Row
                key={member.id}
                name={member.name}
                email={member.email}
                role={member.teamsLead ? "Team Lead" : member.role.name}
                id={member.id}
                team={team}
                index={index}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const Header = ({}) => {
  return (
    <div className="flex bg-muted px-4 py-2 rounded-lg text-center">
      <p className="mr-2 w-10">Sno.</p>
      <p className="flex-1 flex gap-2 items-center justify-start">
        <WholeWordIcon size={14} className="text-muted-foreground" />
        Name
      </p>
      <p className="flex-1 flex gap-2 items-center justify-start max-w-[200px] truncate">
        <AtSignIcon size={14} className="text-muted-foreground" />
        Email
      </p>
      <p className="flex-1 flex gap-2 items-center justify-center">
        <ShieldCheckIcon size={14} className="text-muted-foreground" /> Role
      </p>
      <p className="flex-1 flex gap-2 items-center justify-center">
        <RectangleEllipsisIcon size={18} className="text-muted-foreground" />
      </p>
    </div>
  );
};
const Row = ({ id, team, name, email, role, index }: any) => {
  const router = useRouter();
  const handleRemoveMember = async () => {
    try {
      const teamLeadId = team?.teamLeadId === id ? null : team?.teamLeadId;
      const { removedMember } = await removeMemberFromTeam(
        {
          id: team?.id,
          member: { id: id },
        },
        teamLeadId
      );
      if (removedMember) {
        toast.success("Members successfully made team lead");
        router.refresh();
      } else {
        toast.error("Failed to make members team lead");
      }
    } catch (err) {
      toast.error("Failed to make members team lead");
    }
  };
  return (
    <>
      <div className="flex px-4 py-2">
        <p className="mr-2 w-10 text-center">{index + 1}.</p>
        <p className="flex-1 text-start">{name}</p>
        <p className="flex-1 text-start max-w-[200px] truncate">{email}</p>
        <p className="flex-1 text-center">{role}</p>
        <p className="flex-1 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisIcon size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleRemoveMember}
                className="flex gap-2"
              >
                <Trash2Icon size={14} className="text-destructive" />
                Remove member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
      <Separator />
    </>
  );
};

export default TeamMembers;
