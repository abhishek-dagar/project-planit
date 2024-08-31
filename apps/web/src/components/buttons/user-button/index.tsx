"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { userSignOut } from "@/lib/actions/user-api.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "../../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import UserAvatar from "@/components/common/user-avatar";

type Props = {
  user: any;
  isLarge?: boolean;
};

const UserButton = ({ user, isLarge }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [status, setStatus] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (currentUser) {
  //     pusherClient.subscribe(currentUser.id);

  //     pusherClient.bind("user-status", (status: any) => {
  //       // setIncomingMessages((prev) => [...prev, text])
  //       setStatus(status);
  //     });

  //     return () => {
  //       pusherClient.unsubscribe(currentUser.id);
  //     };
  //   }
  // }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { response } = await userSignOut();
      if (response) {
        toast.success(response);
        router.push("/signin");
      } else {
        toast.error("Logout Failed");
      }
    } catch (err) {
      toast.error("Logout Failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  return (
    currentUser && (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "rounded-full",
              isLarge ? "pr-0 gap-2" : "border-0 hover:bg-transparent p-0"
            )}
          >
            {isLarge && (
              <span className="">
                {currentUser.name?.split(" ")[0] || "NA"}
              </span>
            )}
            <UserAvatar
              text={
                currentUser.name?.split("")[0] ||
                currentUser.email?.split("")[0]
              }
              id={currentUser.id}
              isLarge={isLarge}
            />
            {/* <Avatar className="overflow-visible">
              <AvatarFallback
                className={cn("text-xl uppercase", isLarge && "text-sm")}
              >
                {currentUser.name?.split("")[0] ||
                  currentUser.email?.split("")[0] ||
                  "NA"}
                <span
                  className={cn(
                    "h-3 w-3 bg-red-500 absolute bottom-0.5 right-0.5 rounded-full border-2 border-background",
                    { "bg-green-500": status }
                  )}
                />
              </AvatarFallback>
            </Avatar> */}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto shadow-2xl rounded-xl bg-card z-[200]"
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-16 h-16">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="text-2xl uppercase">
                {currentUser.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">
                {currentUser?.name || "Name not updated"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
          </div>
          <Button
            variant={"ghost"}
            disabled={isLoading}
            className="w-full justify-start mt-2 p-0"
          >
            <Link
              href={"/app/settings/my-account/profile"}
              className="flex items-center gap-2 w-full px-4"
            >
              <SettingsIcon size={16} />
              <p>Manage Profile</p>
            </Link>
          </Button>
          <Separator className="my-3" />
          <Button
            variant={"ghost"}
            disabled={isLoading}
            onClick={() => {
              handleLogout();
            }}
            className="flex items-center gap-2 w-full"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOutIcon />
            )}
            <span>Log out</span>
          </Button>
        </PopoverContent>
      </Popover>
    )
  );
};

export default UserButton;
