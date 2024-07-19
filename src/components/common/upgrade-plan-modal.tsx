"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRightIcon,
  CheckIcon,
  CrownIcon,
  IndianRupeeIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const UpgradePlanModal = ({
  preOpen,
  setPreOpen,
  tier,
}: {
  preOpen: boolean;
  setPreOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tier: any;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(preOpen);
  }, [preOpen]);

  const handleOpen = (value: boolean) => {
    setPreOpen(value);
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-4xl">Your Plan</DialogTitle>
        </DialogHeader>
        <Card className="bg-primary/20 backdrop-blur-md">
          <CardHeader className="pb-3 border-b bg-primary rounded-t-lg flex-row items-center justify-between">
            <CardTitle className="capitalize">{tier?.name}</CardTitle>
            <CardTitle className="capitalize text-2xl flex items-center">
              <IndianRupeeIcon size={16} />
              {tier?.price}
              <span className="text-sm font-light">/month</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            {tier?.features.map((feature: any, index: number) => (
              <p key={feature} className="flex items-center gap-2">
                <CheckIcon size={16} className="text-primary" /> {feature}
              </p>
            ))}
          </CardContent>
        </Card>
        <Button
          className="hover:bg-primary gap-2"
          variant={"secondary"}
          asChild
        >
          <Link
            className="w-full h-full flex justify-center items-center gap-2"
            href="/app/settings/workspace/plans"
          >
            Checkout Plans <CrownIcon size={16} />
            <ArrowRightIcon size={16} />
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePlanModal;
