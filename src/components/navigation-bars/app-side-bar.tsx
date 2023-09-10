"use client";

import { appSideMenu } from "@/lib/config/menu.config";
import { usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { UserSquare2 } from "lucide-react";
import { Icons } from "../icons";

const AppSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="hidden md:block w-[60px] h-screen border-r-[1px]">
      <div className="flex flex-col py-5 gap-6 h-full">
        <div className="flex items-center justify-center">
          <Icons.logo className="text-[#f69220] text-[32px]" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col items-center justify-center gap-2">
            {appSideMenu.map((menu) => {
              const active = pathname.includes(menu.link) && menu.link !== "";
              return (
                <Tooltip key={menu.title}>
                  <TooltipTrigger asChild>
                    <Button
                      className={`${
                        active ? "bg-primary" : ""
                      } p-1.5 rounded-md`}
                      variant={"ghost"}
                      onClick={() => router.push(menu.link)}
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
            <Button
              className={`${
                pathname === "/app/profile" ? "bg-primary hover:bg-primary" : ""
              } p-1.5 rounded-md`}
              variant={"ghost"}
              onClick={() => router.push("/profile")}
            >
              <UserSquare2 />
              {/* <BsPersonCircle className="text-[24px]" /> */}
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppSideBar;
