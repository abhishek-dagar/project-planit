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
import { UpdatePasswordValidation } from "@/lib/types/user.types";
import {
  AtSignIcon,
  BadgeCheckIcon,
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  WholeWordIcon,
} from "lucide-react";
// import { userprofile } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { updateUser, updateUserPassword } from "@/lib/actions/user-update.action";

interface ChangePasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any;
}

export function ChangePasswordForm({
  className,
  user,
  ...props
}: ChangePasswordProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const router = useRouter();

  const changePasswordForm: any = useForm({
    resolver: zodResolver(UpdatePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function handlePassword(field: any, value: boolean) {
    setShowPassword({ ...showPassword, [`${field}`]: value });
  }

  async function onSubmit(values: z.infer<typeof UpdatePasswordValidation>) {
    setIsLoading(true);

    try {
      const { updatedUser,err } = await updateUserPassword({ ...values, id: user?.id });

      if (updatedUser) {
        toast.success("User details updated successfully");
        router.refresh();
      } else {
        toast.error(err);
      }
      changePasswordForm.reset();
    } catch (err) {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("email"))
      changePasswordForm.setValue("email", localStorage.getItem("email")!);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...changePasswordForm}>
        <form
          method="POST"
          onSubmit={changePasswordForm.handleSubmit(onSubmit)}
        >
          <div className="grid gap-2">
            <FormField
              control={changePasswordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-wrap">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="old password"
                      type={showPassword.oldPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      className="flex-1"
                      frontIcon={
                        <LockKeyholeIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      backIcon={
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            handlePassword(
                              "oldPassword",
                              !showPassword.oldPassword
                            )
                          }
                        >
                          {showPassword.oldPassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </Button>
                      }
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-wrap">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="new password"
                      type={showPassword.newPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      frontIcon={
                        <LockKeyholeIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      backIcon={
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            handlePassword(
                              "newPassword",
                              !showPassword.newPassword
                            )
                          }
                        >
                          {showPassword.newPassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </Button>
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
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 flex-wrap">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      frontIcon={
                        <LockKeyholeIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      backIcon={
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            handlePassword(
                              "confirmPassword",
                              !showPassword.confirmPassword
                            )
                          }
                        >
                          {showPassword.confirmPassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </Button>
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
              Change password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
