import PriceCard from "@/components/cards/price-card";
import { priceDetails } from "@/lib/config/price.config";
import { PriceDetailType } from "@/lib/types/price.type";
import React from "react";

const Plans = () => {
  return (
    <div className="h-full flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
      {priceDetails.map((info: PriceDetailType) => (
        <PriceCard key={info.name} info={info} />
      ))}
    </div>
  );
};

export default Plans;
