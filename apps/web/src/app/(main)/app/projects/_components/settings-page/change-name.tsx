"use client";
import { Icons } from "@/components/icons";
import { RocketIcon } from "@/components/icons/rocket";
import { UserRoundIcon } from "@/components/icons/user-round";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/lib/actions/project.action";
import { fetchTeams } from "@/lib/actions/team.action";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  project: any;
};

const ChangeName = ({ project }: Props) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [teams, setTeams] = useState<any>([]);
  const [team, setTeam] = useState(project.team);
  const [searchTeam, setSearchTeam] = useState("");
  const [isLoading, setIsLoading] = useState({
    name: false,
    description: false,
    team: false,
  });
  const router = useRouter();
  const handleUpdate = async () => {
    setIsLoading({
      name: project.name !== name,
      description: project.description !== description,
      team: project.team?.id !== team?.id,
    });
    try {
      const { updatedProject } = await updateProject({
        ...project,
        name,
        description,
        teamId: team ? team.id : null,
      });
      if (updatedProject) {
        toast.success("project details updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to change name");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({ name: false, description: false, team: false });
    }
  };
  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
    setTeam(project.team);
  }, [project]);
  useEffect(() => {
    const fetchTes = async () => {
      const tes = await fetchTeams();
      if (tes) {
        setTeams(tes?.teams);
      }
    };
    fetchTes();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">Name</p>
      <div className="flex items-center gap-2">
        <RocketIcon selected size={30} />
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
          onClick={handleUpdate}
        >
          {isLoading.name ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          change
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground">Assigned team</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <p className="bg-muted border p-1.5 pr-4 select-none rounded-lg flex items-center gap-2 cursor-pointer">
              <UserRoundIcon selected={false} size={18} />
              {team ? team.name : "Select Team"}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="pt-0">
            <Input
              placeholder="Search..."
              className="w-full my-0 border-0 focus-visible:ring-0"
              value={searchTeam}
              autoFocus
              frontIcon={
                <SearchIcon size={14} className="text-muted-foreground" />
              }
              onChange={(e) => setSearchTeam(e.target.value)}
            />
            <DropdownMenuSeparator />
            {teams?.filter((team: any) => team.name.includes(searchTeam))
              .length > 0 ? (
              <>
                {teams
                  ?.filter((team: any) => team.name.includes(searchTeam))
                  .map((team: any, index: number) => {
                    if (index > 3) return null;
                    return (
                      <DropdownMenuItem
                        key={team.id}
                        onClick={() => {
                          setTeam(team);
                        }}
                      >
                        {team.name}
                      </DropdownMenuItem>
                    );
                  })}
                <DropdownMenuItem
                  onClick={() => {
                    setTeam(undefined);
                  }}
                >
                  No team
                </DropdownMenuItem>
              </>
            ) : (
              <p className="text-center w-full">No team found</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="secondary"
          size="sm"
          className="ml-6"
          onClick={handleUpdate}
        >
          {isLoading.name ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          {team ? "Assign team" : "change team"}
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
        <Button variant="secondary" size="sm" onClick={handleUpdate}>
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
