"use client";
import Settings from "@/components/icons/settings";
import { fetchNotifications } from "@/lib/actions/notification.action";
import { menuOptions } from "@/lib/config/menu.config";
import { getRefresh } from "@/lib/helpers/getRefersh";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  user: any;
};
const MobileBottomBar = ({ user }: Props) => {
  const pathName = usePathname();
  const [notifications, setNotifications] = useState<any>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const { notifications } = await fetchNotifications({ read: false });
      if (!notifications) return;
      setNotifications(notifications);
    };
    fetch();
  }, [getRefresh(searchParams.get("refresh"))]);
  return (
    <div className="md:hidden h-12 w-full bg-background border-t">
      <ul className="h-full flex items-center justify-around gap-3">
        {menuOptions.map((menuItem) => {
          if (user?.role?.name === "member" && menuItem.name === "Teams")
            return null;
          return (
            <li key={menuItem.name}>
              <Link
                href={menuItem.href}
                className={cn(
                  "group h-8 w-8 flex items-center justify-center  scale-[1] rounded-lg p-[3px] cursor-pointer",
                  {
                    "dark:bg-[#2F006B] bg-[#EEE0FF] ":
                      pathName === menuItem.href,
                  }
                )}
              >
                {menuItem.name === "Notification" &&
                  notifications?.length > 0 && (
                    <span
                      className={cn(
                        "absolute top-[-6px] right-[-6px] flex h-3 w-3",
                        pathName !== menuItem.href && "top-0 right-0"
                      )}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                <menuItem.Component selected={pathName === menuItem.href} />
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={
              user?.role?.name === "member"
                ? "/app/settings/my-account/profile"
                : "/app/settings/workspace/general"
            }
            className={cn(
              "group h-8 w-8 flex items-center justify-center  scale-[1] rounded-lg p-[3px]  cursor-pointer",
              {
                "dark:bg-[#2F006B] bg-[#EEE0FF] ": pathName === "/settings",
              }
            )}
          >
            <Settings selected={pathName === "/settings"} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileBottomBar;
