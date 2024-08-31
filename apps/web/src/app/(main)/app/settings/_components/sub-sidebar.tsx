"use client";
import { BuildingIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links: any = {
  workspace: {
    General: "/app/settings/workspace/general",
    Members: "/app/settings/workspace/members",
    Plans: "/app/settings/workspace/plans",
    "Export Report": "/app/settings/workspace/export-report",
  },
  account: {
    Profile: "/app/settings/my-account/profile",
    "Change Password": "/app/settings/my-account/change-password",
    Preferences: "/app/settings/my-account/preferences",
  },
};

interface SubSidebarProps {
  user: any;
}
const SubSidebar = ({ user }: SubSidebarProps) => {
  const pathName = usePathname();
  return (
    <div className="bg-muted h-full flex flex-col gap-2">
      <div className="h-full w-full px-3 py-6 flex flex-col gap-4">
        <p className="text-2xl">Settings</p>
        <div className="h-full flex flex-col gap-1 text-md">
          {user?.role?.name !== "member" && (
            <>
              <p className="flex gap-2 items-center text-muted-foreground">
                <BuildingIcon size={16} />
                Workspace
              </p>
              <div className="flex flex-col gap-1 pl-5">
                {Object.keys(links.workspace).map((key) => {
                  return (
                    <Link
                      key={key}
                      href={links.workspace[`${key}`]!}
                      className={`hover:bg-background px-2 py-0.5 rounded-lg ${
                        pathName === links.workspace[key] ? "bg-background" : ""
                      }`}
                    >
                      {key}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
          <p className="flex gap-2 items-center text-muted-foreground">
            <UserCircleIcon size={16} />
            My Account
          </p>
          <div className="flex flex-col gap-1 pl-5">
            {Object.keys(links.account).map((key) => {
              return (
                <Link
                  key={key}
                  href={links.account[`${key}`]!}
                  className={`hover:bg-background px-2 py-0.5 rounded-lg ${
                    pathName === links.account[key] ? "bg-background" : ""
                  }`}
                >
                  {key}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubSidebar;
