"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Collapse from "../shared/collapse";
import Link from "next/link";
import { Group, Project, Team } from "../../lib/interfacesOrEnum/teams-group";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import CreateTeamModal from "../modals/create-team-modal";
import useTeams from "../custom-hooks/teams";

interface Props {
  title: string;
  icon?: any;
  // menus?: Group[];
}
const AppSubsideBar = ({ title, icon }: Props) => {
  const [isTab, setIsTab] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSideBarOpen = () =>
    setIsSidebarOpen((prev) => {
      if (prev) {
        localStorage.setItem("isSidebarOpen", "false");
      } else {
        localStorage.setItem("isSidebarOpen", "true");
      }
      return !prev;
    });

  const [teams] = useTeams({});

  const [menus, setMenus] = useState<Group[]>([]);
  useEffect(() => {
    if (teams) {
      const tempMenu: Group[] = [
        {
          title: "Pinned",
          menu: [],
        },
        {
          title: "Team/Projects",
          menu: [],
        },
      ];
      teams.map((team: any) => {
        const projects: Project[] = team.projects.map((project: Project) => ({
          name: project.name,
          link: `/app/teams/${team.id}/${project.id}`,
          status: project.status,
        }));
        if (team.pinned) {
          tempMenu[0].menu?.push({
            name: team.name,
            link: `/app/teams/${team.id}`,
            icon: team.icon,
            projects: projects,
            team: team,
          });
        }
        tempMenu[1].menu?.push({
          name: team.name,
          link: `/app/teams/${team.id}`,
          icon: team.icon,
          projects: projects,
          team: team,
        });
      });

      setMenus(tempMenu);
    }
  }, [teams]);

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
    if (localStorage.getItem("isSidebarOpen")) {
      if (localStorage.getItem("isSidebarOpen") === "true") {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    !isTab && (
      <div
        className={
          "relative h-full border-r-[1px] hidden md:block bg-secondary-background transition-all " +
          (isSidebarOpen ? "py-5 px-3 w-[220px] flex-none" : "w-0")
        }
      >
        {isSidebarOpen && (
          <div className="flex flex-col h-full gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-[20px] md:text-[20px] font-bold flex items-center gap-2 uppercase">
                {icon}
                {title}
              </p>
              <Input
                className={"py-0 focus-visible:ring-1"}
                clName={"h-8"}
                frontIcon={<Search size={16} />}
                placeholder="search"
                value={searchQuery}
                onChange={handleSearchQuery}
              />
            </div>
            <ScrollArea className="h-full w-full">
              <div className="w-full overflow-hidden">
                {menus.map(
                  (menu) =>
                    menu.menu &&
                    menu.menu.length > 0 && (
                      <div key={menu.title} className="my-4">
                        <Link
                          href={"/app/teams"}
                          className="uppercase truncate text-slate-400 hover:underline select-none"
                        >
                          {menu.title}
                        </Link>
                        {menu.menu.map((me: Team) => {
                          return (
                            me.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) && (
                              <Collapse
                                key={me.name}
                                name={me.name}
                                icon={me.icon}
                                link={me.link}
                                element={me.projects}
                                team={me.team}
                              />
                            )
                          );
                        })}
                      </div>
                    )
                )}
              </div>
            </ScrollArea>
            <div className="flex justify-end md:justify-center">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    className={
                      "text-[24px] md:text-[14px] h-12 md:h-auto w-12 px-2 md:px-4 md:w-auto rounded-full md:rounded-md"
                    }
                  >
                    <Plus />{" "}
                    <p className="hidden md:block pl-2">Add New Team</p>
                  </Button>
                </DialogTrigger>
                <CreateTeamModal handleOpen={handleOpen} open={open} />
              </Dialog>
            </div>
          </div>
        )}
        <div
          className={
            "absolute flex justify-center items-center h-6 w-6 rounded-full border bg-primary top-14 -right-3 z-[45] " +
            (isSidebarOpen
              ? ""
              : "-right-7 rounded-none rounded-r-full top-16 h-7 w-7")
          }
        >
          <Button
            variant={"ghost"}
            className="p-1 hover:bg-transparent h-full"
            onClick={handleSideBarOpen}
          >
            {isSidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight />}
          </Button>
        </div>
      </div>
    )
  );
};

export default AppSubsideBar;
