"use client";

import CreateProjectModal from "@/components/modals/create-project-modal";
import TeamSettingsPage from "@/components/settings-pages/team-setting-page";
import { DataTable } from "@/components/tables/teams-page-tables/data-table";
import {
  Project,
  columns,
} from "@/components/tables/teams-page-tables/project-page-columns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTeam } from "@/lib/actions/team.action";
import { Team } from "@/lib/interfacesOrEnum/teams-group";
import { Plus, Presentation, Search, Settings } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Group {
  title: string;
  projects?: Project[];
}

const SingleTeamProjects = ({ params }: { params: { teamId: string } }) => {
  const [isTab, setIsTab] = useState<boolean>(false);
  const [team, setTeam] = useState<Team>({
    id: "",
    name: "",
    icon: "",
    pinned: false,
    members: "",
    link: "",
    projects: [],
  });
  const { user } = useSelector((state: any) => state.user);
  const [menus, setMenus] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setIsTab(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    getTeam(params.teamId).then(({ team }: any) => {
      setTeam(team);
      const tempMenu: Group[] = [
        {
          title: team?.name,
          projects: [],
        },
      ];
      team?.projects.map((project: Project) => {
        if (project.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
          const tempProject: Project = {
            id: project.id,
            projectName: project.name,
            createdAt: moment(project.createdAt).format("MMMM DD, yyyy"),
            updatedAt: moment(project.updatedAt).format("MMMM DD, yyyy"),
            link: `${team.id}/${project.id}`,
          };
          tempMenu[0].projects?.push(tempProject);
        }
      });
      setMenus(tempMenu);
    });
  }, [user, searchQuery]);

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="projects" className="flex flex-col h-full">
        <div className="flex flex-col gap-4 px-5 pt-5">
          <p className="text-[20px] md:text-[36px] font-bold flex items-center gap-2 uppercase">
            <Presentation />
            Projects
          </p>
          <div className="flex md:justify-between md:items-end border-b-2 flex-col-reverse md:flex-row">
            <div className="">
              <TabsList className="grid w-full grid-cols-2 bg-background">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-background data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-primary"
                >
                  <Presentation size={16} className="mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-background data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-primary"
                >
                  <Settings size={16} className="mr-2" />
                  Team Setting
                </TabsTrigger>
              </TabsList>
            </div>
            <Input
              value={searchQuery}
              onChange={handleSearchQuery}
              className={"py-0 focus-visible:ring-1 bg-secondary-background"}
              clName={"h-8"}
              frontIcon={<Search size={16} />}
              placeholder="search"
            />
          </div>
        </div>
        <ScrollArea className="relative h-full w-full px-5 pb-5">
          {menus.map((tempTeam) => {
            if (!tempTeam.projects) return <div key={0} />;
            return (
              <div key={tempTeam.title} className="w-full h-full my-4">
                <div className="sticky top-0 z-20 bg-background flex items-center justify-between">
                  <p className="uppercase truncate text-slate-400">
                    <Link href={"/app/teams"} className="underline">
                      Teams
                    </Link>{" "}
                    / {tempTeam.title}
                  </p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border-[1px] border-border hover:border-primary p-2 scale-[0.97] hover:scale-100 transition-all"
                      >
                        <Plus className="md:mr-1" size={18} />
                        <p className="hidden md:block">Create Project</p>
                      </Button>
                    </DialogTrigger>
                    <CreateProjectModal
                      handleOpen={handleOpen}
                      open={open}
                      team={team}
                    />
                  </Dialog>
                </div>
                <TabsContent value="projects">
                  {tempTeam.projects && (
                    <DataTable columns={columns} data={tempTeam.projects} />
                  )}
                </TabsContent>
                <TabsContent value="settings">
                  <TeamSettingsPage team={team} />
                </TabsContent>
              </div>
            );
          })}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default SingleTeamProjects;
