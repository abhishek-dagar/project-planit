import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  frontIcon?: any;
  backIcon?: any;
  clName?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, frontIcon, backIcon, clName, ...props }, ref) => {
    return (
      <div
        className={
          "relative my-2 rounded-md border h-10 " +
          className +
          " " +
          `${clName ? clName : ""}`
        }
      >
        {frontIcon && (
          <p className="absolute top-0 h-full flex items-center px-2">
            {frontIcon}
          </p>
        )}
        <input
          type={type}
          className={cn(
            "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            `${frontIcon ? "pl-8" : "pr-8"}`
          )}
          ref={ref}
          {...props}
        />
        {backIcon && (
          <p className="absolute top-0 right-0 h-full flex items-center px-2">
            {backIcon}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
