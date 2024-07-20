import PriceCard from "@/components/cards/price-card";
import { fetchTiers } from "@/lib/actions/tier.action";
import { priceDetails } from "@/lib/config/price.config";
import { currentUser } from "@/lib/helpers/getTokenData";
import { PriceDetailType } from "@/lib/types/price.type";
import { redirect } from "next/navigation";
import React from "react";

const Plans = async() => {
  const user = await currentUser();
  if (!user) redirect("/signin");

  const { tiers } = await fetchTiers();
  
  return (
    <div className="h-full flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
      {tiers?.map((info: PriceDetailType) => (
        <PriceCard key={info.name} info={info} active={user.tier?.name.toLocaleLowerCase() === info.name}/>
      ))}
    </div>
  );
};

export default Plans;
