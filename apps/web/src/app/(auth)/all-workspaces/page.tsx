import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/helpers/getTokenData";
import { NetworkIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Workspaces from "./_components/workspaces";
import AllMembers from "./_components/all-members";
import { Separator } from "@/components/ui/separator";

type Props = {};

const AllWorkspace = async (props: Props) => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  if (
    user.role?.name === "manager" &&
    user.workspaces &&
    user?.workspaces?.length < 1
  )
    redirect("/workspace");
  const workspaces = user?.workspaces;
  const selectedWorkspace = workspaces?.find((workspace: any) =>
    workspace.selected.find((select: any) => select.id === user.id)
  );
  return (
    <div className="flex items-center relative justify-center h-screen w-screen">
      <div className="absolute top-1 left-1 md:top-5 md:left-5">
        <Link
          href={selectedWorkspace ? "/app/dashboard" : "#"}
          className="text-sm md:text-sm text-muted-foreground underline flex items-center gap-2"
        >
          {"<"} Go to dashboard
        </Link>
      </div>
      <div className="absolute top-1 right-1 md:top-5 md:right-5">
        <Logo />
      </div>

      <Card className="flex flex-col items-center justify-center min-w-full md:min-w-[450px] w-full md:w-[80%] rounded-xl shadow-2xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="md:hidden h-16" />
          <CardTitle className="flex gap-2 items-center justify-center">
            <NetworkIcon size={40} />
            <p>Workspaces</p>
          </CardTitle>
          <CardDescription className="text-center">
            Workspace are shared environments where team can work on projects,
            tasks and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Workspaces
            workspaces={workspaces}
            user={user}
            selectedWorkspace={selectedWorkspace}
          />
          <Separator className="mt-4" />
          <h1>All Members</h1>
          <AllMembers user={user} />
        </CardContent>
        <CardFooter className="md:hidden">hello</CardFooter>
      </Card>
    </div>
  );
};

export default AllWorkspace;
