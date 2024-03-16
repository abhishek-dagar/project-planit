import useMembers from "@/components/custom-hooks/members";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from "lodash.debounce";
import { SaveIcon, XIcon } from "lucide-react";
import React, { useCallback, useState } from "react";

const AddMemberToTeamModal = ({ team, table }: any) => {
  const [members] = useMembers({});
  const [showMembers, setShowMembers] = useState(
    members
      .filter(
        (member: any) =>
          !team.members.find((mem: any) => mem.id === member.id) &&
          !member.teamId
      )
      .slice(0, 3)
  );
  const [newMembers, setNewMembers] = useState([]);
  const [query, setQuery] = useState("");

  const filter = (value: any) => {
    const copyMembers = [...members];
    const filteredMembers = copyMembers
      .filter(
        (member) =>
          (member.username.toLowerCase().includes(value.toLowerCase()) ||
            member.email.toLowerCase().includes(value.toLowerCase())) &&
          !team.members.find((mem: any) => mem.id === member.id)
      )
      .slice(0, 3);
    setShowMembers(filteredMembers);
  };

  const request = debounce(async (value: string) => {
    filter(value);
  }, 500);
  const debounceRequest = useCallback((value: string) => request(value), []);
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debounceRequest(e.target.value);
  };

  const handleAdd = (member: any) => {
    setNewMembers((prev: any) => {
      if (prev.find((mem: any) => mem?.id === member.id)) {
        return prev;
      }
      const tempMem = JSON.parse(JSON.stringify(member));
      tempMem.teamId = team.id;
      return [...prev, tempMem];
    });
  };

  const handleRemove = (member: any) => {
    setNewMembers((prev: any) =>
      prev
        .filter((mem: any) => {
          return mem?.id !== member.id;
        })
        .map((mem: any) => {
          const tempMem = JSON.parse(JSON.stringify(mem));
          tempMem.teamId = null;
          return tempMem;
        })
    );
  };

  const addMemberToTeam = () => {
    table.options.meta?.addDate(newMembers);
  };

  return (
    <div>
      <DialogHeader className="border-b-2 pb-2">Add Member</DialogHeader>
      <div className="pt-3">
        <div>
          <Label htmlFor="email">Email/Username</Label>
          <Input
            type="text"
            placeholder="Email/Username"
            value={query}
            onChange={handleQuery}
            className="border-0 bg-secondary-background"
          />
        </div>
        {newMembers && newMembers.length > 0 && (
          <div>
            <div className="flex justify-between">
              <Label htmlFor="email">Added Members</Label>
              <Button
                variant={"secondary"}
                className="p-0 px-2 h-auto rounded-md text-[14px] hover:bg-selected hover:text-primary"
                onClick={() => addMemberToTeam()}
              >
                <SaveIcon size={12} className="mr-2" />
                save
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {newMembers.map((member: any, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="font-light flex gap-2"
                >
                  {member?.username}
                  <Button
                    className="p-0.5 bg-background h-auto rounded-full"
                    onClick={() => handleRemove(member)}
                  >
                    <XIcon size={12} />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="email">Members</Label>
          <div>
            {showMembers.map((member: any) => (
              <div
                key={member.id}
                className="flex justify-between px-2 items-center py-2 text-subtitle"
              >
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarFallback>
                      {member.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.username}</span>
                </div>
                <span className="text-muted-foreground">{member.email}</span>
                {newMembers.find((mem: any) => mem?.id === member.id) ? (
                  <Button
                    className="flex items-center justify-center px-2 py-1 cursor-pointer border-primary rounded-sm bg-secondary-background select-none text-[14px] text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemove(member)}
                  >
                    - Remove
                  </Button>
                ) : (
                  <Button
                    className="flex items-center justify-center px-2 py-1 cursor-pointer border-primary rounded-sm bg-secondary-background select-none text-[14px] text-muted-foreground hover:text-foreground"
                    onClick={() => handleAdd(member)}
                  >
                    + Add
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberToTeamModal;
