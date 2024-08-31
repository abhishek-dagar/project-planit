"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/components/custom-hooks/media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronsUpDownIcon,
  NetworkIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateWorkspace } from "@/lib/actions/workspace.action";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function Btn({ workspaces, user }: any) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<any>(
    workspaces?.find((workspace: any) =>
      workspace.selected.find((select: any) => select.id === user.id)
    )
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleWorkspaceClick = async (workspace: any) => {
    try {
      setSelectedWorkspace({
        ...workspace,
        selected: [...workspace.selected, user],
      });
      await updateWorkspace(
        { id: selectedWorkspace.id, selected: user.id },
        false
      );
      await updateWorkspace({ id: workspace.id, selected: user.id }, true);
      router.push(pathname.split("?")[0]);
      router.refresh();
    } catch (err) {
      toast.error("Failed to change workspace");
    } finally {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    setSelectedWorkspace(
      workspaces?.find((workspace: any) =>
        workspace.selected.find((select: any) => select.id === user.id)
      )
    );
  }, [workspaces, user]);

  const handleClose = (value: boolean) => {
    setSearch("");
    setOpen(value);
  };

  if (isDesktop) {
    return (
      <DropdownMenu open={open} onOpenChange={handleClose}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="max-w-[200px] truncate flex items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-6 w-6 bg-primary rounded-sm">
                <AvatarFallback className="bg-primary capitalize rounded-sm">
                  {selectedWorkspace?.name?.split("")[0] || "NA"}
                </AvatarFallback>
              </Avatar>
              <p className="max-w-[80px] truncate">{selectedWorkspace?.name}</p>
            </div>
            <ChevronsUpDownIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[200px] md:w-[300px] max-h-[315px] overflow-auto"
          align="end"
        >
          <div className="flex items-center gap-4 px-2 py-1.5">
            <Avatar className="h-6 w-6 bg-primary rounded-sm">
              <AvatarFallback className="bg-primary capitalize rounded-sm">
                {selectedWorkspace?.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
            <p className="max-w-[80px] truncate">{selectedWorkspace?.name}</p>
          </div>
          {user?.role?.name !== "member" && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={"/app/settings/workspace/general"}
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <SettingsIcon size={16} />
                  <p>Manage Workspace</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/workspace"}
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <SettingsIcon size={16} />
                  <p>Create new Workspace</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/all-workspaces"}
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <NetworkIcon size={16} />
                  <p>All workspaces</p>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <div>
            <Input
              placeholder="Search..."
              value={search}
              frontIcon={
                <SearchIcon size={14} className="text-muted-foreground" />
              }
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-28 overflow-auto">
            {workspaces
              .filter((workspace: any) => workspace.name.includes(search))
              .map((workspace: any, index: number) => {
                // if (search==="" && index >= 3) return null;
                return (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => handleWorkspaceClick(workspace)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-6 w-6 bg-primary rounded-sm">
                        <AvatarFallback className="bg-primary capitalize rounded-sm">
                          {workspace.name?.split("")[0] || "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <p className="max-w-[80px] truncate">{workspace.name}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
          </div>
          {workspaces.filter((workspace: any) =>
            workspace.name.includes(search)
          ).length < 1 && <p className="px-2 py-1.5">No workspace found</p>}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="max-w-[200px] truncate flex items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-6 w-6 bg-primary rounded-sm">
              <AvatarFallback className="bg-primary capitalize rounded-sm">
                {selectedWorkspace?.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
            <p className="max-w-[80px] truncate">{selectedWorkspace?.name}</p>
          </div>
          <ChevronsUpDownIcon size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <div className="flex items-center gap-4 px-2 py-1.5">
            <Avatar className="h-6 w-6 bg-primary rounded-sm">
              <AvatarFallback className="bg-primary capitalize rounded-sm">
                {selectedWorkspace?.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
            <p className="max-w-[80px] truncate">{selectedWorkspace?.name}</p>
          </div>
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <div className="flex items-center gap-2">
              <SettingsIcon size={16} />
              <p>Manage Workspace</p>
            </div>
          </div>
          <Separator />
          <div>
            <Input
              placeholder="Search..."
              value={search}
              frontIcon={
                <SearchIcon size={14} className="text-muted-foreground" />
              }
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {workspaces
            .filter((workspace: any) => workspace.name.includes(search))
            .map((workspace: any, index: number) => {
              if (index >= 3) return null;
              return (
                <div
                  key={workspace.id}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-6 w-6 bg-primary rounded-sm">
                      <AvatarFallback className="bg-primary capitalize rounded-sm">
                        {workspace.name?.split("")[0] || "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="max-w-[80px] truncate">{workspace.name}</p>
                  </div>
                </div>
              );
            })}
          {workspaces.filter((workspace: any) =>
            workspace.name.includes(search)
          ).length < 1 && <p className="px-2 py-1.5">No workspace found</p>}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
