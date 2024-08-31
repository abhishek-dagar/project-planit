"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        style: {
          borderLeft: "4px solid",
          // borderColor: "var(--primary)",
        },
        classNames: {
          toast:
            "!border-l-4 bg-muted text-foreground  border-primary shadow-lg ",
          success: "!border-primary",
          error: "!text-destructive",
          warning: "!text-yellow-400",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          closeButton: "bg-muted text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
