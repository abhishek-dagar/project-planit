"use client";
import { settingsMenu } from "@/lib/config/menu.config";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingsSubSideBar = () => {
  const pathname = usePathname();
  return (
    <div
      className={
        "relative h-full border-r-[1px] hidden md:block bg-background transition-all " +
        "py-5 px-3 w-[220px] flex-none"
      }
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[20px] pl-3 md:text-[20px] font-bold flex items-center gap-2 uppercase">
            {/* {icon} */}
            <SettingsIcon />
            Settings
          </p>
          {/* divider */}

          <div className="h-[3px] w-full bg-secondary-background" />
        </div>
        <div className="flex flex-col gap-4">
          {settingsMenu.map((menu) => (
            <Link
              key={menu.title}
              href={menu.link}
              className={`flex gap-3 px-4 py-2 items-center rounded-lg text-muted-foreground ${
                pathname === menu.link ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <menu.Icon />
              <span>{menu.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSubSideBar;
