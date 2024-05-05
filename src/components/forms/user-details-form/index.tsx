"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { UserRegisterValidation } from "@/lib/form-validators/user-validator";
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
import {
  loginAction,
  updateMember,
  userRegisterAction,
} from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUser from "@/components/custom-hooks/user";
import { MailIcon } from "lucide-react";
import UpdatePasswordModal from "@/components/modals/update-password-model";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserDetailsForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [user, { setCurrentUser }] = useUser({});

  const router = useRouter();

  const registerForm: any = useForm({
    resolver: zodResolver(UserRegisterValidation),
    defaultValues: {
      email: user ? user.email : "",
      username: user ? user.username : "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserRegisterValidation>) {
    setIsLoading(true);
    try {
      const updatedUser = await updateMember({ id: user.id, ...values });

      if (updatedUser.response) {
        setCurrentUser({ ...user, ...values });
        toast({
          description: "User details updated Successful",
        });
      } else {
        toast({
          description: "User details Failed to update",
        });
      }
    } catch {
      toast({
        description: "User details Failed to update",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (user) registerForm.setValue("email", user?.email);
    registerForm.setValue("username", user?.username);
  }, [user]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Avatar
        </p>
        <Avatar className="w-36 h-36">
          <AvatarFallback className="bg-background text-title-lg">
            {user && user.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="name@example.com"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        frontIcon={
                          <MailIcon
                            size={16}
                            className="text-muted-foreground"
                          />
                        }
                        className="flex items-center"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      frontIcon={
                        <Icons.userRound className="text-muted-foreground" />
                      }
                      className="flex items-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UpdatePasswordModal id={user?.id} />
            <Button
              onClick={() => onSubmit(registerForm.getValues())}
              disabled={isLoading}
              className="w-[120px] mt-4"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
