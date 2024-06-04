"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AtSignIcon,
  ChevronRightIcon,
  EllipsisIcon,
  RectangleEllipsisIcon,
  SearchIcon,
  ShieldCheckIcon,
  Trash2Icon,
  WholeWordIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AddMemberModal from "./add-member-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeMember, updateUser } from "@/lib/actions/user-update.action";
import { updateWorkspace } from "@/lib/actions/workspace.action";
import AddMemberFromAnotherWorkspaceModal from "./add-member-from-another-workspace-modal";

type Props = {
  user: any;
};

const MembersTable = ({ user }: Props) => {
  const [search, setSearch] = useState("");
  const workspaces = user?.workspaces;
  const selectedWorkspace = workspaces?.find((workspace: any) =>
    workspace.selected.find((select: any) => select.id === user.id)
  );

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
        <div className="flex gap-2">
          <AddMemberFromAnotherWorkspaceModal
            workspaces={workspaces}
            selectedWorkspace={selectedWorkspace}
            user={user}
          />
          <AddMemberModal user={user} />
        </div>
      </div>
      <ScrollArea className="h-[400px] relative">
        <div className="flex flex-col sticky top-0 left-0">
          <Header />
        </div>
        <div className="flex flex-col">
          {user &&
            selectedWorkspace?.users
              .filter(
                (member: any) =>
                  member.name.includes(search) || member.email.includes(search)
              )
              .map((member: any, index: number) => (
                <Row
                  key={member.email}
                  name={member.name}
                  email={member.email}
                  role={member.role.name}
                  id={member.id}
                  index={index}
                  user={user}
                  workspaceId={selectedWorkspace?.id}
                />
              ))}
          {/* <Row /> */}
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
      <p className="flex-1 flex gap-2 items-center justify-start">
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
const Row = ({ id, name, email, role, index, user, workspaceId }: any) => {
  const router = useRouter();

  const roles: { name: string; label: string; description: string }[] = [
    {
      name: "member",
      label: "Member",
      description: "Can view and edit own tasks",
    },
    {
      name: "co manager",
      label: "Co Manager",
      description: "Can do anything in all workspaces",
    },
  ];
  const handleDeleteMember = async () => {
    try {
      const { removed, err }: any = await removeMember({ id });
      if (removed) {
        toast.success("Member Deleted successfully");
        router.refresh();
      } else {
        toast.error(err);
      }
    } catch (err) {
      toast.error("Failed to Deleted member");
    }
  };
  const handleRemoveMember = async () => {
    try {
      const { workspace, err }: any = await updateWorkspace(
        { id: workspaceId, users: id },
        false
      );
      if (workspace) {
        toast.success("Member removed successfully from workspace");
        router.refresh();
      } else {
        toast.error(err);
      }
    } catch (err) {
      toast.error("Failed to remove member from workspace");
    }
  };

  const handleUpdateRole = async (role: string) => {
    try {
      const workspaceIds: string[] = user.workspaces.map(
        (workspace: any) => workspace.id
      );
      const { updatedUser, err }: any = await updateUser(
        { id, role },
        workspaceIds
      );
      if (updatedUser) {
        toast.success("Member role updated successfully");
        router.refresh();
      } else {
        toast.error(err);
      }
    } catch (err) {
      toast.error("Failed to update member role");
    }
  };
  return (
    <>
      <div className="flex px-4 py-2">
        <p className="mr-2 w-10 text-center">{index + 1}.</p>
        <p className="flex-1 text-start">{name}</p>
        <p className="flex-1 text-start max-w-[200px] truncate">{email}</p>
        <p className="flex-1 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"secondary"}
                className="min-w-[130px] py-0 justify-between border-l-4 border-primary focus-visible:ring-0"
              >
                <p className="select-none">{role}</p>
                <ChevronRightIcon size={14} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {roles.map((rol) => (
                <DropdownMenuItem
                  key={rol.name}
                  onClick={() => handleUpdateRole(rol.name)}
                  className={`flex-col items-start px-4 border-l-4 border-transparent ${
                    role === rol.name ? "border-primary bg-muted" : ""
                  }`}
                >
                  <p className="text-sm flex gap-2 items-center">
                    <ShieldCheckIcon
                      size={14}
                      className="text-muted-foreground"
                    />
                    {rol.label}
                  </p>
                  <p className={`text-xs text-muted-foreground`}>
                    {rol.description}
                  </p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
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
                Remove member from workspace
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteMember}
                className="flex gap-2"
              >
                <Trash2Icon size={14} className="text-destructive" />
                Delete member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
      <Separator />
    </>
  );
};

export default MembersTable;
