import SettingsSubSection from "@/components/common/settings-sub-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import { WorkspaceForm } from "./_components/workspace-form";

const General = async () => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  const workspaces = user?.workspaces;
  if (user.role?.name === "manager" && user.workspaces &&user?.workspaces?.length < 1)
    redirect("/workspace");
  const selectedWorkspace = workspaces.find((workspace: any) =>
    workspace.selected.find((select: any) => select.id === user.id)
  );
  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection
        heading="Workspace"
        subheading="Mange your workspace"
      />
      <SettingsSubSection className="gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex-1 flex items-center justify-center">
            <Avatar className="h-32 w-32 rounded-xl">
              <AvatarFallback className="text-4xl uppercase rounded-xl">
                {selectedWorkspace?.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-xl">General</p>
            <WorkspaceForm workspace={selectedWorkspace} />
          </div>
        </div>
      </SettingsSubSection>
    </div>
  );
};

export default General;
