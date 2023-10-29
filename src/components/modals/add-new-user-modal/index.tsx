import useUser from "@/components/custom-hooks/user";
import { RegisterForm } from "@/components/forms/register-form";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginAction, userRegisterAction } from "@/lib/actions/user.actions";
import { UserRegisterValidation } from "@/lib/form-validators/user-validator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const AddNewUser = ({ className, ...props }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [defaultPassword, setDefaultPassword] = useState<boolean>(true);
  const { toast } = useToast();

  const router = useRouter();
  const [user] = useUser({});

  const registerForm: any = useForm({
    resolver: zodResolver(UserRegisterValidation),
    defaultValues: {
      email: "",
      username: "",
      password: defaultPassword ? "12345678" : "",
      confirmPassword: defaultPassword ? "12345678" : "",
    },
  });

  function handlePassword(value: boolean) {
    setShowPassword(value);
  }
  function handleDefaultPassword(value: boolean) {
    setDefaultPassword(value);
  }

  async function onSubmit(values: z.infer<typeof UserRegisterValidation>) {
    setIsLoading(true);

    const member = JSON.parse(JSON.stringify(values));

    member["managerId"] = user?.id;
    member["role"] = "member";
    if (defaultPassword) {
      member.password = member.username + "@12345";
      member.confirmPassword = member.username + "@12345";
    }

    const { response, err }: any = await userRegisterAction(member);

    if (response) {
      toast({
        description: "Member Added Successful",
      });
    } else {
      // toast({
      //   variant: "destructive",
      //   description: err.response.data.error,
      // });
    }
    setIsLoading(false);
  }
  return (
    <>
      <DialogHeader>Add new Member</DialogHeader>
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
                        className="bg-secondary-background"
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
                        className="bg-secondary-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!defaultPassword && (
                <>
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
                            className="bg-secondary-background"
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
                            className="bg-secondary-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="items-top flex space-x-2 select-none mb-4 mt-2">
                <Checkbox
                  id="checkBox"
                  checked={defaultPassword}
                  onCheckedChange={handleDefaultPassword}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checkBox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Set default password : username+@12345
                  </label>
                </div>
              </div>
              {!defaultPassword && (
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
      </div>
    </>
  );
};

export default AddNewUser;
