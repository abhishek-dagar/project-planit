import { useMediaQuery } from "@/components/custom-hooks/media-query";
import { UserRoundIcon } from "@/components/icons/user-round";
import { UserRoundSearchIcon } from "@/components/icons/user-search";
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
import { UserType } from "@/lib/types/user.types";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface FindChatMemberModalProps {
  user: UserType;
}
const FindChatMemberModal = ({ user }: FindChatMemberModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [allMembers, setAllMembers] = useState<UserType[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (user) {
      if (user.role?.name === "manager") {
        setAllMembers(user.members);
      } else {
        const members: UserType[] | undefined = user.manager?.members.filter(
          (member: any) => member.id !== user.id
        );
        if (!members) return setAllMembers([user.manager!]);

        setAllMembers([user.manager!, ...members]);
      }
    }
  }, [user]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <UserRoundSearchIcon selected />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member toTeam</DialogTitle>
            <DialogDescription>Add member to the team</DialogDescription>
          </DialogHeader>
          {/* <TeamForm setOpen={setOpen} /> */}
          <MemberSelector members={allMembers} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <UserRoundSearchIcon selected />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="border-t p-4">
          <MemberSelector members={allMembers} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MemberSelector = ({
  members,
  setOpen,
}: {
  members: UserType[];
  setOpen: (value: boolean) => void;
}) => {
  const [search, setSearch] = useState("");

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
                if (index > 5) return null;
                return (
                  <Button
                    variant={"ghost"}
                    key={member.id}
                    onClick={() => setOpen(false)}
                    asChild
                  >
                    <Link
                      href={`/app/chats?chatId=${member.id}`}
                      className={`!justify-start gap-2`}
                    >
                      <UserRoundIcon selected size={16} />
                      <p>{member.name}</p>
                      <p className="text-muted-foreground">{member.email}</p>
                    </Link>
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

export default FindChatMemberModal;
