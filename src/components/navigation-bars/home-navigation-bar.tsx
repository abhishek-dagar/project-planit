"use client";
import React from "react";
import { Button } from "../ui/button";
import { homeMenu } from "@/lib/config/menu.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Logo from "../logo";
import { Menu } from "lucide-react";

const HomeNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="md:container sticky top-0 z-20 bg-background">
      <div className="flex justify-between p-4 border-b-2">
        <Logo />
        <div className="flex gap-2 md:gap-8 lg:gap-12 xl:gap-14">
          <ul className="hidden lg:flex gap-7 xl:gap-12 items-center">
            {homeMenu.map((menu) => (
              <li key={menu.title} className="text-[16px]">
                <Button
                  variant={"link"}
                  active={menu.link === pathname}
                  asChild
                  className="text-black"
                >
                  <Link href={menu.link}>{menu.title}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Button
              className="shadow-button hidden min-[375px]:block hover:shadow-none transition-shadow ease-in"
              asChild
            >
              <Link href={"/register"} className="text-[14px] text-center">
                SignUp for free
              </Link>
            </Button>
            <Button
              className="shadow-button hidden lg:block hover:shadow-none hover:text-primary transition-all ease-in"
              variant="secondary"
              asChild
            >
              <Link href={"/login"}>login</Link>
            </Button>
          </div>
          {/* Small device side bar */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"} className="p-3">
                  <Menu className="text-[24px]" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"right"}>
                <SheetHeader>
                  <SheetTitle>ProjectPlaint</SheetTitle>
                  <ul className="flex flex-col gap-7 items-start pt-5">
                    {homeMenu.map((menu) => (
                      <li key={menu.title} className={`text-[16px]`}>
                        <Button
                          variant={"link"}
                          asChild
                          className={`${
                            menu.link === pathname
                              ? "text-primary"
                              : "text-black"
                          } text-[24px] font-bold`}
                          active={menu.link === pathname}
                        >
                          <Link href={menu.link}>{menu.title}</Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </SheetHeader>
                <SheetFooter className="gap-3 pt-5">
                  <Button className="shadow-button" variant="secondary" asChild>
                    <Link href={"/login"}>login</Link>
                  </Button>
                  <Button className="shadow-button" asChild>
                    <Link href={"/register"}>register</Link>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavigation;
