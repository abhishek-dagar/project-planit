import React from "react";
import UserButton from "@/components/buttons/user-button";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import WorkspaceButton from "@/components/buttons/worspace-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CrownIcon } from "lucide-react";
// import WorkspaceButton from "@/components/buttons/worspace-button";

type Props = {};

const InfoBar = async (props: Props) => {
  const user = await currentUser();
  if (!user) redirect("/signin");

  return (
    <div className="h-14 flex flex-row justify-end gap-6 items-center px-4 py-2 w-full dark:bg-black ">
      <Button asChild>
        {user?.tier?.name.toLocaleLowerCase() !== "free" ? null : (
          <Link
            href={"/app/settings/workspace/plans"}
            className="bg-primary/70 shadow-md"
          >
            Upgrade <CrownIcon size={16} />
          </Link>
        )}
      </Button>
      <WorkspaceButton />
      <UserButton user={user} />
    </div>
  );
};

export default InfoBar;
