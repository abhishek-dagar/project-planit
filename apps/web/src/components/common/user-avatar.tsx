"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { useSocket } from "@/context/SocketProvider";
import { fetchUserProfile } from "@/lib/actions/user.action";

const UserAvatar = ({ text, id, isLarge, isSmall }: any) => {
  const [status, setStatus] = useState(false);
  const { socket } = useSocket();
  // useEffect(() => {
  //   if (id) {
  //     pusherClient.subscribe(id);

  //     pusherClient.bind("user-status", (data: any) => {
  //       if (data.id === id) setStatus(data.status);
  //     });

  //     return () => {
  //       pusherClient.unsubscribe(id);
  //     };
  //   }
  // }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const response = await fetchUserProfile(id);
        if (response.user) {
          setStatus(response.user.isOnline);
        }
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (id && socket) {
      socket.on("user-status", (data: any) => {
        if (data.id === id) {
          setStatus(data.status);
        }
      });

      return () => {
        socket.off("user-status");
      };
    }
  }, [id, socket]);

  return (
    <Avatar className={cn("overflow-visible", { "h-6 w-6": isSmall })}>
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback
        className={cn("text-xl uppercase", isLarge && "text-sm", {
          "text-xs": isSmall,
        })}
      >
        {text || "NA"}
        <span
          className={cn(
            "h-3 w-3 bg-red-500 absolute bottom-0.5 right-0.5 rounded-full border-2 border-background",
            { "bg-green-500": status },
            { "bottom-0 right-0 h-2 w-2": isSmall }
          )}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
