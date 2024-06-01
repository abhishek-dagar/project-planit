"use client";
import { Icons } from "@/components/icons";
import { UserRoundIcon } from "@/components/icons/user-round";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateTeam } from "@/lib/actions/team.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  team: any;
};

const ChangeName = ({ team }: Props) => {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [isLoading, setIsLoading] = useState({
    name: false,
    description: false,
  });
  const router = useRouter();
  const handleNameChange = async () => {
    setIsLoading({
      name: team.name !== name,
      description: team.description !== description,
    });
    try {
      const { updatedTeam } = await updateTeam({
        id: team.id,
        name,
        description,
      });
      if (updatedTeam) {
        toast.success("Name changed successfully");
        router.push(`/app/teams/${team.id}`);
      } else {
        toast.error("Failed to change name");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({ name: false, description: false });
    }
  };
  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
  }, [team]);
  return (
    <div className="flex flex-col">
      <p className="text-muted-foreground">Name</p>
      <div className="flex items-center gap-2">
        <UserRoundIcon selected size={30} />
        <Input
          placeholder="Name"
          value={name}
          disabled={isLoading.name}
          className="bg-muted"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="secondary"
          size="sm"
          className="ml-6"
          onClick={handleNameChange}
        >
          {isLoading.name ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          change
        </Button>
      </div>
      <p className="text-muted-foreground">Description</p>
      <div className="flex flex-col items-start gap-2">
        <Textarea
          placeholder="Description"
          value={description}
          rows={3}
          disabled={isLoading.description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-muted resize-none"
        />
        <Button variant="secondary" size="sm" onClick={handleNameChange}>
          {isLoading.description ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          Update Description
        </Button>
      </div>
    </div>
  );
};

export default ChangeName;
