"use client";

import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SearchIcon, WholeWordIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createTeam, fetchTeams } from "@/lib/actions/team.action";
import { RocketIcon } from "@/components/icons/rocket";
import { ProjectValidation } from "@/lib/types/project.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRoundIcon } from "@/components/icons/user-round";
import { createProject } from "@/lib/actions/project.action";
import UpgradePlanModal from "@/components/common/upgrade-plan-modal";

interface ProjectFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectForm({
  className,
  setOpen,
  ...props
}: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teams, setTeams] = useState<any>();
  const [team, setTeam] = useState<any>();
  const [searchTeam, setSearchTeam] = useState("");
  const [upgradePlanModalOpen, setUpgradePlanModalOpen] =
    useState<boolean>(false);
  const [tier, setTier] = useState();

  const router = useRouter();

  const projectForm: any = useForm({
    resolver: zodResolver(ProjectValidation),
    defaultValues: {
      name: "",
      description: "",
      teamId: undefined,
    },
  });

  useEffect(() => {
    const fetchTes = async () => {
      const tes = await fetchTeams();
      if (tes) {
        setTeams(tes?.teams);
      }
    };
    fetchTes();
  }, []);

  async function onSubmit(values: z.infer<typeof ProjectValidation>) {
    setIsLoading(true);

    try {
      //   console.log(values);
      const { project, err, tier } = await createProject(values);
      if (project) {
        toast.success("project Created");
        setOpen(false);
        router.refresh();
      } else if (tier.name === "free") {
        setTier(tier);
        setUpgradePlanModalOpen(true);
        // toast.error(err);
      } else if (err) {
        toast.error(err);
      } else {
        toast.error("Failed to create project1");
      }
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpgradePlanModal
        preOpen={upgradePlanModalOpen}
        setPreOpen={setUpgradePlanModalOpen}
        tier={tier}
      />
      <div className="w-full flex justify-center">
        <RocketIcon size={60} selected={true} />
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...projectForm}>
          <form onSubmit={projectForm.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={projectForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        frontIcon={
                          <WholeWordIcon
                            size={14}
                            className="text-muted-foreground"
                          />
                        }
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={projectForm.control}
                name="teamId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <p className="w-full border p-1.5 rounded-lg flex items-center gap-2">
                              <UserRoundIcon selected={false} size={18} />
                              {team ? team.name : "Select Team"}
                            </p>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            {...field}
                            align="start"
                            className="pt-0"
                          >
                            <Input
                              placeholder="Search..."
                              className="w-full my-0 border-0 focus-visible:ring-0"
                              value={searchTeam}
                              frontIcon={
                                <SearchIcon
                                  size={14}
                                  className="text-muted-foreground"
                                />
                              }
                              onChange={(e) => setSearchTeam(e.target.value)}
                            />
                            <DropdownMenuSeparator />
                            {teams?.filter((team: any) =>
                              team.name.includes(searchTeam)
                            ).length > 0 ? (
                              teams
                                ?.filter((team: any) =>
                                  team.name.includes(searchTeam)
                                )
                                .map((team: any, index: number) => {
                                  if (index > 3) return null;
                                  return (
                                    <DropdownMenuItem
                                      key={team.id}
                                      onClick={() => {
                                        projectForm.setValue("teamId", team.id);
                                        setTeam(team);
                                      }}
                                    >
                                      {team.name}
                                    </DropdownMenuItem>
                                  );
                                })
                            ) : (
                              <p className="text-center w-full">
                                No team found
                              </p>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={projectForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        rows={3}
                        disabled={isLoading}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => onSubmit(projectForm.getValues())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
