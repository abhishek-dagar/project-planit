"use client";

import { appSideMenu } from "@/lib/config/menu.config";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserSquare } from "lucide-react";
import SearchModal from "../modals/search-modal";
import useUser from "../custom-hooks/user";

const AppBottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user] = useUser({});

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
    <>
      {/* fake bottom bar */}
      <div className="h-14 invisible block md:hidden" />
      <div className="fixed bottom-0 w-full block md:hidden bg-background h-14 border-t-2">
        <div className="flex items-center h-full justify-around">
          {appSideMenu.map((menu) => {
            const active = pathname.includes(menu.link) && menu.link !== "";
            if ((!user || user?.role === "member") && menu.title === "Teams")
              return;
            return (
              <Button
                key={menu.title}
                className={`${
                  active ? "bg-primary hover:bg-primary" : ""
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
            );
          })}
          <Button
            className={`${
              pathname === "/app/profile" ? "bg-primary hover:bg-primary" : ""
            } p-1.5 rounded-md`}
            variant={"ghost"}
            onClick={() => router.push("/app/profile")}
          >
            <UserSquare className="text-[24px]" />
          </Button>
        </div>
        <SearchModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default AppBottomBar;
