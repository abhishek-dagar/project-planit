import { CardBody } from "@/components/common/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceDetailType } from "@/lib/types/price.type";
import { cn } from "@/lib/utils";
import { IndianRupeeIcon } from "lucide-react";
import React from "react";

const PriceCard = ({
  info,
  selected,
}: {
  info: PriceDetailType;
  selected: boolean;
}) => {
  return (
    <Card className={cn("bg-muted", { "!border-primary": selected })}>
      <CardHeader className="items-center">
        <div
          className={cn("h-5 w-5 rounded-full border border-primary", {
            "bg-primary": selected,
          })}
        />
        <CardTitle className="text-3xl font-semibold capitalize text-start">
          {info.name}
        </CardTitle>
        <h2 className="text-6xl flex">
          <IndianRupeeIcon size={60} />
          {info.price}
        </h2>
        <p className="text-muted-foreground">member per month</p>
      </CardHeader>
      <p className="px-6 pb-2 text-muted-foreground">{info.description}</p>
    </Card>
  );
};

export default PriceCard;
