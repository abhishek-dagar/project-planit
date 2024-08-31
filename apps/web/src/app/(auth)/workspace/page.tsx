import UserButton from "@/components/buttons/user-button";
import { WorkspaceForm } from "@/components/forms/workspace";
import Logo from "@/components/icons/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@/lib/helpers/getTokenData";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Workspace = async() => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex items-center relative justify-center h-screen w-screen">
      <div className="absolute top-5 left-5">
        <Link
          href={"/app/dashboard"}
          className="text-muted-foreground underline flex items-center gap-2"
        >
          {"<"} Go to dashboard
        </Link>
      </div>
      <div className="absolute top-5 right-5 flex gap-2">
        <Logo />
        <UserButton user={user} isLarge/>
      </div>

      <Card className="flex flex-col items-center justify-center min-w-full md:min-w-[450px] w-full md:w-[450px] rounded-xl shadow-2xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>
            <p>Create a workspace</p>
          </CardTitle>
          <CardDescription className="text-center">
            Workspace are shared environments where team can work on projects,
            tasks and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <WorkspaceForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Workspace;
