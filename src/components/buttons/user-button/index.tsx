"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { userSignOut } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "../../icons";
import Link from "next/link";

type Props = {
  user: any;
};

const UserButton = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const router = useRouter();

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
        <PopoverTrigger>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="text-xl uppercase">
              {currentUser.name?.split("")[0] || "NA"}
            </AvatarFallback>
          </Avatar>
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
