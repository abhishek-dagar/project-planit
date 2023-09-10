"use client";

import { appSideMenu } from "@/lib/config/menu.config";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserSquare } from "lucide-react";

const AppBottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {/* fake bottom bar */}
      <div className="h-14 invisible block md:hidden" />
      <div className="fixed bottom-0 w-full block md:hidden bg-background h-14 border-t-2">
        <div className="flex items-center h-full justify-around">
          {appSideMenu.map((menu) => {
            const active = pathname.includes(menu.link) && menu.link !== "";
            return (
              <Button
                key={menu.title}
                className={`${
                  active ? "bg-primary hover:bg-primary" : ""
                } p-1.5 rounded-md`}
                variant={"ghost"}
                onClick={() => router.push(menu.link)}
              >
                <menu.icon className="text-[24px]" />
              </Button>
            );
          })}
          <Button
            className={`${
              pathname === "/profile" ? "bg-primary hover:bg-primary" : ""
            } p-1.5 rounded-md`}
            variant={"ghost"}
            onClick={() => router.push("/profile")}
          >
            <UserSquare className="text-[24px]" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppBottomBar;
