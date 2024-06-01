import React from "react";
import UserButton from "@/components/buttons/user-button";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import WorkspaceButton from "@/components/buttons/worspace-button";
// import WorkspaceButton from "@/components/buttons/worspace-button";

type Props = {};

const InfoBar = async (props: Props) => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-2 w-full dark:bg-black ">
      <WorkspaceButton />
      <UserButton user={user} />
    </div>
  );
};

export default InfoBar;