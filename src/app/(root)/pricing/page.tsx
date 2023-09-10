"use client";
import PriceCards from "@/components/cards/price-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPricing } from "@/lib/actions/price.action";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Pricing {
  title: string;
  price: string;
  features: Array<string>;
  description: string;
  additionalFeature?: string | undefined;
  disabled?: boolean;
}

const Pricing = () => {
  const [activePrice, setActivePrice] = useState(0);
  const [pricing, setPricing] = useState<Array<Pricing>>([]);

  const handleActivePrice = (index: number) => {
    if (index !== activePrice) setActivePrice(index);
  };

  const getPrices = async () => {
    const { data }: any = await getPricing();
    setPricing(data.pricingData);
  };

  useEffect(() => {
    localStorage.setItem("price", "0");
    getPrices();
  }, []);

  return (
    <div className="container flex flex-col gap-6 py-12">
      <div className="flex items-center justify-center flex-col">
        <p className="text-title-md lg:text-title-lg font-bold">
          Ready to get Started?
        </p>
        <p className="text-[18px] font-semibold">
          Choose a plan tailored to your need
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:justify-center gap-1">
          {pricing.length > 0 &&
            pricing.map((price, index) => (
              <PriceCards
                key={index}
                title={price.title}
                price={price.price}
                features={price.features}
                description={price.description}
                active={activePrice === index}
                additionalFeature={price.additionalFeature}
                index={index}
                handleCardClick={handleActivePrice}
                disabled={price.disabled}
              />
            ))}
        </div>
      </div>
      <div className="lg:mx-24">
        <Table className="bg-white rounded-md">
          <TableCaption>
            A comparison of all Features in all Prices.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50 text-[24px]">
              <TableHead>Overview</TableHead>
              {pricing.map((price) => (
                <TableHead key={price.title} className="w-[100px] text-center">
                  {price.title}
                  <p className="text-[10px]">
                    {price.disabled && "(coming soon)"}
                  </p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricing.map((pr, index) => {
              return pr.features?.map((feature) => (
                <TableRow key={feature}>
                  <TableCell>{feature}</TableCell>
                  {pricing.map((p, ind) => (
                    <TableCell
                      key={p.title}
                      className={`${
                        activePrice === ind
                          ? "bg-primary text-white"
                          : "text-primary"
                      }`}
                    >
                      {ind >= index && <Check className={"w-full"} />}
                    </TableCell>
                  ))}
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Pricing;
