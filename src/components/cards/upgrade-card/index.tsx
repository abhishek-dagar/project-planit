import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const UpgradeCard = ({ reason }: { reason: string }) => {
  return (
    <>
      <DialogTitle>Upgrade Your Plan</DialogTitle>
      <div>
        <span className="text-muted-foreground">{reason}</span>
      </div>
      <DialogFooter className="flex-col sm:flex-col justify-end">
        <Button className="w-full" asChild disabled>
          <Link
            href={"/pricing"}
            className="pointer-events-none cursor-not-allowed opacity-50"
          >
            <RocketIcon className="mr-2" />
            Upgrade {"(coming soon...)"}
          </Link>
        </Button>
      </DialogFooter>
    </>
  );
};

export default UpgradeCard;
