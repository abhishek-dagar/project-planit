"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateWorkspace } from "@/lib/actions/workspace.action";
import { NetworkIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Workspaces = ({
  workspaces,
  user,
  selectedWorkspace,
}: {
  workspaces: any;
  user: any;
  selectedWorkspace: any;
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleWorkspaceClick = async (workspace: any) => {
    try {
      if (selectedWorkspace) {
        await updateWorkspace(
          { id: selectedWorkspace.id, selected: user.id },
          false
        );
      }
      await updateWorkspace({ id: workspace.id, selected: user.id }, true);
      router.push("/app/dashboard");
    } catch (err) {
      toast.error("Failed to change workspace");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search..."
        value={search}
        frontIcon={<SearchIcon size={14} className="text-muted-foreground" />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-2 max-h-[100px] overflow-y-auto">
        {workspaces
          ?.filter((workspace: any) => workspace.name.includes(search))
          .map((workspace: any) => (
            <div
              key={workspace.id}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2 items-center">
                <NetworkIcon size={18} className="text-muted-foreground" />
                <span>{workspace.name}</span>
              </div>
              <Button
                variant="outline"
                className="hover:border-primary rounded-full py-0 h-7"
                onClick={() => handleWorkspaceClick(workspace)}
              >
                Open
              </Button>
            </div>
          ))}
      </div>
      {workspaces.filter((workspace: any) => workspace.name.includes(search))
        .length < 1 && <p className="px-2 py-1.5">No workspace found</p>}
    </div>
  );
};

export default Workspaces;
