import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layers3Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GroupByDropdown = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const url = window.location.href.replace(/&groupBy=[^&]*/g, "");
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="gap-2 py-0 h-8 text-muted-foreground hover:text-foreground"
        >
          <Layers3Icon size={16} />
          <p>Group By</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setOpen(false)}>
          <Link href={url + "&groupBy=status"} className="w-full h-full">
            Status
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(false)}>
          <Link href={url + "&groupBy=priority"} className="w-full h-full">
            priority
          </Link>
        </DropdownMenuItem>
        {searchParams.get("view") !== "board" && (
          <DropdownMenuItem onClick={() => setOpen(false)}>
            <Link href={url} className="w-full h-full">
              none
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupByDropdown;
