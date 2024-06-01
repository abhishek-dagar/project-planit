"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogOutIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { userSignOut } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "../../icons";

type Props = {
  user: any;
};

const UserButton = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    user && (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{user.name?.split("")[0] || "NA"}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto shadow-2xl rounded-xl bg-card z-[200]"
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-16 h-16">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>{user.name?.split("")[0] || "NA"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">
                {user?.name || "Name not updated"}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
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
