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
import { UserSignInValidation } from "@/lib/types/user.types";
import { AtSignIcon, LockKeyholeIcon } from "lucide-react";
import { userSignIn } from "@/lib/actions/user-api.action";
import { toast } from "sonner";

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const signInForm: any = useForm({
    resolver: zodResolver(UserSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handlePassword(value: boolean) {
    setShowPassword(value);
  }

  async function onSubmit(values: z.infer<typeof UserSignInValidation>) {
    setIsLoading(true);

    try {
      const { response }: any = await userSignIn(values);
      if (response) {
        toast.success("Login Successful");
        router.push("/app/dashboard");
      } else {
        toast.error("Login Filed Try again");
      }
    } catch (err) {
      toast.error("Login Filed Try again");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("email"))
      signInForm.setValue("email", localStorage.getItem("email")!);
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...signInForm}>
        <form method="POST" onSubmit={signInForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={signInForm.control}
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
            <FormField
              control={signInForm.control}
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Login
            </Button>
            {/* <Button
              disabled={isLoading}
              variant={"outline"}
              onClick={() => {
                signInForm.setValue("email", "dargarabhishek96@gmail.com");
                signInForm.setValue("password", "12345678");
                onSubmit(signInForm.getValues());
              }}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Demo Login
            </Button> */}
            <p>
              Already have an account?{" "}
              <Link href={"/signup"} className="text-primary">
                SignUp here!
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
