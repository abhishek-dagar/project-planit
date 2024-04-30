"use client";

import {
  Teams,
  columns,
} from "@/components/tables/teams-page-tables/team-page-columns";
import { DataTable } from "@/components/tables/teams-page-tables/data-table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CalendarDays, Group, Plus, Search, Users2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateTeamModal from "@/components/modals/create-team-modal";
import useTeams from "@/components/custom-hooks/teams";
import useUser from "@/components/custom-hooks/user";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Menus {
  title: string;
  menu?: Teams[];
}

const TeamsPage = () => {
  const [isTab, setIsTab] = useState<boolean>(false);
  const [menus, setMenus] = useState<Menus[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [teams] = useTeams({});
  const [user] = useUser({});

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    if (user && user?.role.toLowerCase() !== "manager") {
      router.push("/app/dashboard");
    }
  }, []);

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
    if (teams) {
      const tempMenu: Menus[] = [
        {
          title: "Team Projects",
          menu: [],
        },
      ];
      teams.map((team: any) => {
        if (team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          tempMenu[0].menu?.push({
            id: team.id,
            teamName: team.name,
            createdAt: moment(team.createdAt).format("MMMM DD, yyyy"),
            updatedAt: moment(team.updatedAt).format("MMMM DD, yyyy"),
            link: team.id,
            pinned: team.pinned,
            icon: team.icon,
          });
        }
      });

      setMenus(tempMenu);
    }
  }, [teams, searchQuery]);

  return user ? (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4  px-5 pt-5">
          <p className="text-[20px] md:text-[36px] font-bold flex items-center gap-2 uppercase">
            <Users2Icon size={26} />
            Teams
          </p>
          <Input
            value={searchQuery}
            onChange={handleSearchQuery}
            className={"py-0 focus-visible:ring-1 bg-background"}
            frontIcon={<Search size={16} />}
            placeholder="search"
          />
        </div>
        <ScrollArea className="h-full w-full px-5 pb-5">
          {menus.map((team: Menus) => {
            if (!team.menu || team.menu?.length <= 0)
              return (
                <div
                  key={0}
                  className="flex h-full w-full flex-col justify-center items-center"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="121"
                      fill="none"
                    >
                      <g filter="url(#a)">
                        <path
                          fill="url(#b)"
                          d="M40.199 34.84a6 6 0 0 1 4.755-2.342h30.092A6 6 0 0 1 79.8 34.84l16.955 22.04A6 6 0 0 1 98 60.54v21.959a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6v-21.96a6 6 0 0 1 1.244-3.657L40.2 34.84Z"
                        />
                        <path
                          fill="url(#c)"
                          fillOpacity=".5"
                          fillRule="evenodd"
                          d="M75.046 34.498H44.954a4 4 0 0 0-3.17 1.561L24.83 58.1a4 4 0 0 0-.83 2.44v21.959a4 4 0 0 0 4 4h64a4 4 0 0 0 4-4v-21.96a4 4 0 0 0-.83-2.438L78.216 36.06a4 4 0 0 0-3.17-1.562Zm-30.092-2A6 6 0 0 0 40.2 34.84L23.244 56.88A6 6 0 0 0 22 60.54v21.959a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-21.96a6 6 0 0 0-1.244-3.657L79.8 34.84a6 6 0 0 0-4.755-2.342H44.954Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="url(#d)"
                          fillOpacity=".5"
                          fillRule="evenodd"
                          d="M75.046 33.498H44.954a5 5 0 0 0-3.963 1.951L24.037 57.49A5 5 0 0 0 23 60.54v21.959a5 5 0 0 0 5 5h64a5 5 0 0 0 5-5v-21.96a5 5 0 0 0-1.037-3.048L79.01 35.45a5 5 0 0 0-3.963-1.952Zm-30.092-1A6 6 0 0 0 40.2 34.84L23.244 56.88A6 6 0 0 0 22 60.54v21.959a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-21.96a6 6 0 0 0-1.244-3.657L79.8 34.84a6 6 0 0 0-4.755-2.342H44.954Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="url(#e)"
                          d="M46.784 37.498a3 3 0 0 0-2.37 1.16l-11.653 15c-1.531 1.97-.127 4.84 2.369 4.84H48a1 1 0 0 1 1 1v6a3 3 0 0 0 3 3h17a3 3 0 0 0 3-3v-6a1 1 0 0 1 1-1h11.87c2.496 0 3.9-2.87 2.37-4.84l-11.655-15a3 3 0 0 0-2.37-1.16h-26.43Z"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="b"
                          x1="46"
                          x2="47.568"
                          y1="87.206"
                          y2="31.696"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#41407C" />
                          <stop
                            offset="1"
                            stopColor="#41407C"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="c"
                          x1="60"
                          x2="60"
                          y1="32.498"
                          y2="65.998"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#7F77F1" />
                          <stop
                            offset="1"
                            stopColor="#7F77F1"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="d"
                          x1="60"
                          x2="60"
                          y1="32.498"
                          y2="65.998"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#7F77F1" />
                          <stop
                            offset="1"
                            stopColor="#7F77F1"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="e"
                          x1="59.99"
                          x2="59.99"
                          y1="37.498"
                          y2="74.498"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#43418D" />
                          <stop offset="1" stopColor="#4C47AB" />
                          <stop offset="1" stopColor="#615CC0" />
                        </linearGradient>
                        <filter
                          id="a"
                          width="152"
                          height="152"
                          x="-16"
                          y="-11.501"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="8" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_16_9401"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_16_9401"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-title-md">
                    You don't have any Team
                  </span>
                  <span className="text-subtitle text-muted-foreground">
                   Create your First Team
                  </span>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border-[1px] border-border hover:border-primary p-2 scale-[0.97] hover:scale-100 transition-all mt-2"
                      >
                        <Plus className="md:mr-1" />
                        <p className="hidden md:block">Create new Team</p>
                      </Button>
                    </DialogTrigger>
                    <CreateTeamModal handleOpen={handleOpen} open={open} />
                  </Dialog>
                </div>
              );
            return (
              <div key={team?.title} className="w-full h-full my-4">
                <div className="flex items-center justify-between">
                  <p className="uppercase truncate text-slate-400">
                    {team?.title}
                  </p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border-[1px] border-border hover:border-primary p-2 scale-[0.97] hover:scale-100 transition-all"
                      >
                        <Plus className="md:mr-1" />
                        <p className="hidden md:block">Create new Team</p>
                      </Button>
                    </DialogTrigger>
                    <CreateTeamModal handleOpen={handleOpen} open={open} />
                  </Dialog>
                </div>
                {team.menu && (
                  <DataTable
                    columns={columns}
                    data={team.menu}
                    icon={<Group />}
                  />
                )}
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  ) : (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4  px-5 pt-5">
          <Skeleton className="w-[200px] h-8" />
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
