import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Team } from "@/lib/interfacesOrEnum/teams-group";
import React, { useState } from "react";

interface Props {
  team: Team;
}

const DeleteTeamModal = ({ team }: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirmText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value);
    if (e.target.value === team.name) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  };
  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <DialogContent className="border-red-500">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your team
          along with it's projects and tasks, and remove your data from our
          servers.
          <div className=" border-t mt-3 pt-3">
            <Label>To Confirm, type "{team.name}"</Label>
            <Input
              className={
                "bg-secondary-background border-red-500 focus-visible:border-transparent focus-visible:ring-red-500"
              }
              value={confirmText}
              onChange={handleConfirmText}
            />
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          className="bg-secondary-background border border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white w-full"
          disabled={isLoading || !isConfirmed}
          onClick={handleDelete}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteTeamModal;
