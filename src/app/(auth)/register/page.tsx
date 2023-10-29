import { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="h-full w-full overflow-auto relative flex items-center justify-center">
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "default" }),
            "absolute right-4 top-4 md:right-8 md:top-8 hidden lg:block"
          )}
        >
          {"Login"}
        </Link>
        <div className="px-5 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <RegisterForm />
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
