"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (value: string) => {
    const themeArray = theme?.split("-") || [];
    themeArray[0] = value;
    setTheme(value + "-" + themeArray[1]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 text-foreground">
          {theme?.split("-")[0] === "light" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
          {/* <span className="">{theme ? theme.split("-")[0] : "light"}</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark-violet")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
