"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserProfileValidation } from "@/lib/types/user.types";
import {
  AtSignIcon,
  BadgeCheckIcon,
  LockKeyholeIcon,
  WholeWordIcon,
} from "lucide-react";
// import { userprofile } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/user-update.action";

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any;
}

export function ProfileForm({ className, user, ...props }: ProfileProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const profileForm: any = useForm({
    resolver: zodResolver(UserProfileValidation),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserProfileValidation>) {
    setIsLoading(true);

    try {
      const { updatedUser } = await updateUser({ ...values, id: user?.id });

      if (updatedUser) {
        toast.success("User details updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update user details1");
      }
    } catch (err) {
      toast.error("Failed to update user details");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("email"))
      profileForm.setValue("email", localStorage.getItem("email")!);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...profileForm}>
        <form method="POST" onSubmit={profileForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-wrap">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      className="flex-1"
                      frontIcon={
                        <AtSignIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                  <Link
                    href={"#"}
                    className="text-muted-foreground text-sm flex gap-1 items-center hover:text-foreground"
                  >
                    <BadgeCheckIcon
                      size={18}
                      className={`${user.isVerified ? "text-primary" : ""}`}
                    />
                    {user.isVerified ? "verified" : "unverified"}
                  </Link>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-wrap">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      type={"text"}
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      frontIcon={
                        <WholeWordIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      className="flex-1"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
