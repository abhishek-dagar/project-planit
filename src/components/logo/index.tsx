import { useRouter } from "next/navigation";
import React from "react";
import { Icons } from "../icons";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-start text-[20px] md:text-[28px] font-bold cursor-pointer select-none"
      onClick={() => router.push("/")}
    >
      <Icons.logo className="text-[#f69220]" />
      <p>Project</p>
      <p className="text-[#f69220]">PlanIt</p>
    </div>
  );
};

export default Logo;
