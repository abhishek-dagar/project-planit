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
import { loginAction, userRegisterAction } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const registerForm: any = useForm({
    resolver: zodResolver(UserRegisterValidation),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handlePassword(value: boolean) {
    setShowPassword(value);
  }

  async function onSubmit(values: z.infer<typeof UserRegisterValidation>) {
    setIsLoading(true);

    const { response, err }: any = await userRegisterAction(values);

    if (response) {
      toast({
        description: "Register Successful",
      });
      await loginAction({
        emailOrUsername: values.email,
        password: values.password,
      });
      router.push("/app");
    } else {
      toast({
        description: "Registration Filed Try again",
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem("email"))
      registerForm.setValue("email", localStorage.getItem("email")!);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={registerForm.control}
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
                      disabled={isLoading}
                      {...field}
                    />
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
                  <FormLabel className="sr-only">username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Register with Email
            </Button>
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "lg:hidden"
              )}
            >
              Login
            </Link>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
