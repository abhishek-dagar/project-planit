"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  MemberRegisterValidation,
  UserRegisterValidation,
} from "@/lib/types/user.types";
import { AtSignIcon, LockKeyholeIcon } from "lucide-react";
import { userSignUp } from "@/lib/actions/user-api.action";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewMember } from "@/lib/actions/user-update.action";

interface AddMemberFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddMemberForm({
  className,
  user,
  setOpen,
  ...props
}: AddMemberFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDefaultPassword, setIsDefaultPassword] = useState<boolean>(true);

  const router = useRouter();

  const memberRegisterForm: any = useForm({
    resolver: zodResolver(MemberRegisterValidation),
    defaultValues: {
      email: "",
      role: "member",
      password: "",
      confirmPassword: "",
    },
  });

  function handlePassword(value: boolean) {
    setShowPassword(value);
  }

  async function onSubmit(values: z.infer<typeof MemberRegisterValidation>) {
    setIsLoading(true);
    try {
      if (values.password === "")
        values.password = values.email.split("@")[0] + "@12345";
      values.managerId = user.id;
      values.tierId = user.tierId;

      const workspaceIds: string[] = [];
      const selectedWorkspace = user.workspaces?.find(
        (workspace: any) => workspace.selected.find((select: any) => select.id === user.id)
      );
      if (values.role === "member") {
        workspaceIds.push(selectedWorkspace.id);
      } else {
        user.workspaces.map((workspace: any) =>
          workspaceIds.push(workspace.id)
        );
      }

      const { newMember, err }: any = await addNewMember(values, workspaceIds, selectedWorkspace.id);
      if (newMember) {
        toast.success("Member Added Successful");
        memberRegisterForm.reset();
        setOpen(false);
        router.refresh();
      } else {
        toast.error(err);
      }
    } catch (err) {
      toast.error("Failed to add member");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("email"))
      memberRegisterForm.setValue("email", localStorage.getItem("email")!);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...memberRegisterForm}>
        <form onSubmit={memberRegisterForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={memberRegisterForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="co manager">Co Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={memberRegisterForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      frontIcon={
                        <AtSignIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      }
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isDefaultPassword && (
              <>
                <FormField
                  control={memberRegisterForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="none"
                          autoCorrect="off"
                          frontIcon={
                            <LockKeyholeIcon
                              size={14}
                              className="text-muted-foreground"
                            />
                          }
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={memberRegisterForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          frontIcon={
                            <LockKeyholeIcon
                              size={14}
                              className="text-muted-foreground"
                            />
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {!isDefaultPassword && (
              <div className="items-top flex space-x-2 select-none mb-4 mt-2">
                <Checkbox
                  id="checkBox"
                  checked={showPassword}
                  onCheckedChange={handlePassword}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checkBox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show password
                  </label>
                </div>
              </div>
            )}
            <div className="items-top flex space-x-2 select-none mb-4 mt-2">
              <Checkbox
                id="checkBox"
                checked={isDefaultPassword}
                onCheckedChange={(value: boolean) =>
                  setIsDefaultPassword(value)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="checkBox"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Default Password
                </label>
                {isDefaultPassword && (
                  <p className="text-xs text-muted-foreground">
                    {"password will be email before @ + '@12345'"}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={() => onSubmit(memberRegisterForm.getValues())}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Add member
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
