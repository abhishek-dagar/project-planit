import SettingsSubSection from "@/components/common/settings-sub-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import { WorkspaceForm } from "./_components/workspace-form";
import DeleteConfirmModal from "@/components/common/delete-confirm-modal";
import { deleteWorkspace } from "@/lib/actions/workspace.action";
import { Separator } from "@/components/ui/separator";

const General = async () => {
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
  const handleDeleteTeam = async () => {
    "use server";
    try {
      if (selectedWorkspace) {
        const { deletedWorkspace } = await deleteWorkspace(
          selectedWorkspace.id
        );
        if (deletedWorkspace) {
          return { success: "Workspace deleted successfully" };
        }
      } else {
        return { err: "Failed to delete workspace" };
      }
    } catch (error: any) {
      return { err: error.message };
    }
  };
  return (
    <div className="flex flex-col items-center py-4 gap-4 pb-7 relative h-[calc(100vh-3.5rem)] overflow-auto">
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
        <div className="w-3/4 flex flex-col gap-3 items-start">
          <h1 className="text-xl">Delete Workspace</h1>
          <p className="text-muted-foreground">
            Are you sure you want to delete
          </p>
          <DeleteConfirmModal
            onConfirm={handleDeleteTeam}
            redirectTo="/all-workspaces"
          />
        </div>
    </div>
  );
};

export default General;
