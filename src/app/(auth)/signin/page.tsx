import { SignInForm } from "@/components/forms/sign-in";
import { RegisterForm } from "@/components/forms/sign-up";
import Logo from "@/components/icons/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <Card className="flex flex-col items-center justify-center min-w-full md:min-w-[450px] rounded-xl">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>
          <Logo />
        </CardTitle>
        <CardDescription>Sign up to project planit</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <SignInForm />
      </CardContent>
    </Card>
  );
};

export default SignIn;
