import React from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  isSmall?: boolean;
  className?: string;
}
const Logo = ({ className, isSmall = false }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-start text-[20px] md:text-[28px] font-bold cursor-pointer select-none",
        className
      )}
    >
      <Icons.logo className="text-[#f69220]" />
      {!isSmall && (
        <>
          <p>Project</p>
          <p className="text-[#f69220]">PlanIt</p>
        </>
      )}
    </Link>
  );
};

export default Logo;
