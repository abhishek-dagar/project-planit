import useMembers from "@/components/custom-hooks/members";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";

const AddMemberToTeamModal = () => {
  const [members] = useMembers({});
  const [showMembers, setShowMembers] = useState(members.slice(0, 3));
  const [query, setQuery] = useState("");

  const filter = (value: any) => {
    const copyMembers = [...members];
    const filteredMembers = copyMembers
      .filter(
        (member) =>
          member.username.toLowerCase().includes(value.toLowerCase()) ||
          member.email.toLowerCase().includes(value.toLowerCase())
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
  return (
    <div>
      <DialogHeader className="border-b-2 pb-2">Add Member</DialogHeader>
      <div className="pt-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            placeholder="Email"
            value={query}
            onChange={handleQuery}
            className="border-0 bg-secondary-background"
          />
        </div>
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
                <Button className="flex items-center justify-center px-2 py-1 cursor-pointer border-primary rounded-sm bg-secondary-background select-none text-[14px] text-muted-foreground hover:text-foreground">
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberToTeamModal;
