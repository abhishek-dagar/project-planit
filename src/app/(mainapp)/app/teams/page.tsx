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

const Teams = () => {
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
    console.log(user?.role);
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
            <Users2Icon size={26}/>
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
            if (!team.menu || team.menu?.length <= 0) return <div key={0} />;
            return (
              <div key={team.title} className="w-full h-full my-4">
                <div className="flex items-center justify-between">
                  <p className="uppercase truncate text-slate-400">
                    {team.title}
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

export default Teams;
