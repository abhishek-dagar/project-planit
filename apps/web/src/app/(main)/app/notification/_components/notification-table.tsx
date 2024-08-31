import { InboxIcon } from "@/components/icons/inbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fetchNotifications,
  updateNotification,
} from "@/lib/actions/notification.action";
import { getRefresh } from "@/lib/helpers/getRefersh";
import { MailIcon, MailOpenIcon } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  toId: string | null;
  fromId: string | null;
}

const NotificationTable = ({ read }: { read?: boolean }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetch = async () => {
      const { notifications } = await fetchNotifications({ read });
      if (!notifications) return;
      setNotifications(notifications);
    };
    fetch();
  }, [getRefresh(searchParams.get("refresh"))]);

  return notifications.length > 0 ? (
    <div className="flex flex-col items-center py-4 gap-4 relative w-full">
      <div className="w-3/4 bg-muted rounded-md">
        {notifications.map((notification) => (
          <NotificationRow notification={notification} key={notification.id}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col items-center justify-center">
      <InboxIcon size={100} selected />
      <p className="text-3xl font-bold text-center">
        No {read ? "read" : "Unread"} notification Available
      </p>
      <p className="text-sm text-muted-foreground">
        Congratulations! You cleared your {read ? "read" : "Unread"}{" "}
        notifications 🎉
      </p>
    </div>
  );
};

const NotificationRow = ({ notification }: { notification: Notification }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleRead = async () => {
    const { updatedNotification } = await updateNotification({
      id: notification.id,
      read: !notification.read,
    });
    if (updatedNotification) {
      router.push(getRefresh(searchParams.get("refresh")));
    }
  };
  return (
    <div className="px-6 py-2 border-b border-background flex items-center gap-4">
      <Button
        className="truncate"
        variant={"ghost"}
        size={"icon"}
        onClick={handleRead}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              {notification.read ? (
                <MailOpenIcon size={16} />
              ) : (
                <MailIcon size={16} />
              )}
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-black/60 backdrop-blur-xl"
            >
              <p>Mark as {notification.read ? "Un read" : "Read"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
      <p className="min-w-[100px] truncate">{notification.title}</p>
      <p className="flex-1 truncate">
        {notification.description || "No description Available"}
      </p>
      <p className="w-[100px] text-xs">
        {moment(notification.createdAt).format("hh:mm A")}
      </p>
    </div>
  );
};

export default NotificationTable;
