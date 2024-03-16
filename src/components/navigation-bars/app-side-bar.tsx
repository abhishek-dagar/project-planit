"use client";

import { appSideMenu } from "@/lib/config/menu.config";
import { usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { UserPlus, UserSquare2 } from "lucide-react";
import { Icons } from "../icons";
import SearchModal from "../modals/search-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import AddNewUser from "../modals/add-new-user-modal";
import { RegisterForm } from "../forms/register-form";
import useUser from "../custom-hooks/user";
import { useHotkeys } from "../custom-hooks/hotkeys";

const AppSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user] = useUser({});

  useHotkeys([["alt,s", () => setOpen((prev) => !prev)]]);
  useHotkeys([["alt,p", () => router.push("/app/profile")]]);
  useHotkeys([["alt,t", () => router.push("/app/teams")]]);
  useHotkeys([["alt,d", () => router.push("/app/dashboard")]]);

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "s" && (e.metaKey || e.altKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //     if (e.key === "p" && (e.metaKey || e.altKey)) {
  //       e.preventDefault();
  //       setOpen(false);
  //       router.push("/app/profile");
  //     }
  //     if (e.key === "t" && (e.metaKey || e.altKey)) {
  //       e.preventDefault();
  //       setOpen(false);
  //       router.push("/app/teams");
  //     }
  //     if (e.key === "d" && (e.metaKey || e.altKey)) {
  //       e.preventDefault();
  //       setOpen(false);
  //       router.push("/app/dashboard");
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  return (
    <div className="hidden md:block bg-background w-[60px] h-screen border-r-[1px]">
      <div className="flex flex-col py-5 gap-6 h-full">
        <div className="flex items-center justify-center">
          <Icons.logo
            className="text-[#f69220] text-[32px] cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col items-center justify-center gap-2">
            {appSideMenu.map((menu) => {
              const active = pathname.includes(menu.link) && menu.link !== "";

              if ((!user || user?.role === "member") && menu.title === "Teams")
                return;

              if ((!user || user?.role === "manager") && menu.title === "Tasks")
                return;

              return (
                <Tooltip key={menu.title}>
                  <TooltipTrigger asChild>
                    <Button
                      className={`${
                        active ? "bg-primary" : ""
                      } p-1.5 rounded-md`}
                      variant={"ghost"}
                      onClick={() => {
                        if (menu.title.toLowerCase() === "search") {
                          setOpen(true);
                        }
                        router.push(menu.link);
                      }}
                    >
                      <menu.icon className="text-[24px]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{menu.title}</p>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </ul>
          <ul className="flex flex-col items-center justify-center gap-2">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className={`p-1.5 rounded-md`} variant={"ghost"}>
                    <UserPlus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                  {/* <RegisterForm /> */}
                  <AddNewUser />
                </DialogContent>
              </Dialog>
            </div>
            <Button
              className={`${
                pathname === "/app/profile" ? "bg-primary hover:bg-primary" : ""
              } p-1.5 rounded-md`}
              variant={"ghost"}
              onClick={() => router.push("/app/profile")}
            >
              <UserSquare2 />
              {/* <BsPersonCircle className="text-[24px]" /> */}
            </Button>
          </ul>
        </div>
      </div>
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AppSideBar;
