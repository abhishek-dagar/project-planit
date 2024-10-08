"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import Logo from "@/components/icons/logo";
import { menuOptions } from "@/lib/config/menu.config";
import Settings from "@/components/icons/settings";
import { fetchNotifications } from "@/lib/actions/notification.action";
import { getRefresh } from "@/lib/helpers/getRefersh";
import { cn } from "@/lib/utils";
import "./index.css";
import { notifyUserOffline, notifyUserOnline } from "@/lib/actions/user.action";
import { NotificationType } from "@/lib/types/notification.type";

type Props = {
  user: any;
};

const Sidebar = ({ user }: Props) => {
  const pathName = usePathname();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    notifyUserOnline();
    return () => {
      notifyUserOffline();
    };
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const { notifications } = await fetchNotifications({ read: false });
      if (!notifications) return;
      setNotifications(notifications);
    };
    fetch();
  }, [getRefresh(searchParams.get("refresh"))]);

  return (
    <nav className="hidden h-screen overflow-hidden justify-between md:flex items-center flex-col gap-10 py-6 px-2 min-w-10">
      <div className="flex items-center justify-center flex-col gap-8">
        <Logo isSmall />
        <TooltipProvider>
          <ul className="flex items-center justify-center flex-col gap-3">
            {menuOptions.map((menuItem) => {
              if (user?.role?.name === "member" && menuItem.name === "Teams")
                return null;
              return (
                <Tooltip delayDuration={0} key={menuItem.name}>
                  <TooltipTrigger>
                    <li>
                      <Link
                        href={menuItem.href}
                        className={clsx(
                          "group h-8 w-8 flex items-center justify-center  scale-[1] rounded-lg p-[3px] cursor-pointer",
                          {
                            "dark:bg-[#2F006B] bg-[#EEE0FF] ":
                              pathName === menuItem.href,
                          }
                        )}
                      >
                        {menuItem.name === "Notification" &&
                          notifications?.length > 0 && (
                            <span
                              className={cn(
                                "absolute top-[-6px] right-[-6px] flex h-3 w-3",
                                pathName !== menuItem.href && "top-0 right-0"
                              )}
                            >
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                          )}
                        <menuItem.Component
                          selected={pathName === menuItem.href}
                        />
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-black/10 backdrop-blur-xl"
                  >
                    <p>{menuItem.name}</p>
                    {/* <TooltipArrow /> */}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </ul>
        </TooltipProvider>
        <Separator />
        <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-1 rounded-full max-h-56 overflow-auto no-slide-bar border-[1px]">
          {/* <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <LucideMousePointerClick className="dark:text-white" size={14} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <GitBranch className="text-muted-foreground" size={14} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <Database className="text-muted-foreground" size={14} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div> */}
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Link href="/app/workflow-map">
                  <div
                    className={cn(
                      "relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]",
                      { "bg-[#EEE0FF]": pathName === "/app/workflow-map" }
                    )}
                  >
                    <GitBranch
                      className={cn("text-muted-foreground", {
                        "text-[#9F54FF]": pathName === "/app/workflow-map",
                      })}
                      size={14}
                    />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-black/10 backdrop-blur-xl"
              >
                Workflow Map
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
        <Link
          href={
            user?.role?.name === "member"
              ? "/app/settings/my-account/profile"
              : "/app/settings/workspace/general"
          }
          className={clsx(
            "group h-8 w-8 flex items-center justify-center  scale-[1] rounded-lg p-[3px]  cursor-pointer",
            {
              "dark:bg-[#2F006B] bg-[#EEE0FF] ": pathName.includes("settings"),
            }
          )}
        >
          <Settings selected={pathName.includes("settings")} />
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
