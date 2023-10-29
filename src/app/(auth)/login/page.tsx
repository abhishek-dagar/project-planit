import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserLoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="h-full w-full overflow-auto relative flex items-center justify-center">
        <Link
          href={"/register"}
          className={cn(
            buttonVariants({ variant: "default" }),
            "absolute right-4 top-4 md:right-8 md:top-8 hidden lg:block"
          )}
        >
          {"Register"}
        </Link>
        <div className="px-5 lg:p-8 z-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-5xl font-semibold tracking-tight">
                Login your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email/username below to login your account
              </p>
            </div>
            <UserLoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
