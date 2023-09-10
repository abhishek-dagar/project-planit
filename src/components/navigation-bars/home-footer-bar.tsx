"use client";
import React from "react";
import moment from "moment";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import Logo from "../logo";

const HomeFooter = () => {
  return (
    <div className="bg-primary text-white p-12">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <p>Copyright©{moment().year()} Copyright: ProjectPlanIt</p>
        <div className="flex h-5 items-center space-x-2">
          <Button variant={"link"} className="text-white text-[12px]" active>
            Legal stuff
          </Button>
          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-white"
          />
          <Button variant={"link"} className="text-white text-[12px]" active>
            Privacy Policy
          </Button>
          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-white"
          />
          <Button variant={"link"} className="text-white text-[12px]" active>
            Security
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
