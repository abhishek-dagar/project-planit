import React from "react";
import { Icons } from "../icons";
import Link from "next/link";

interface Props {
  isSmall?: boolean;
}
const Logo = ({ isSmall = false }: Props) => {
  return (
    <Link
      href="/"
      className="flex items-start text-[20px] md:text-[28px] font-bold cursor-pointer select-none"
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
