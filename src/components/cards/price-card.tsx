"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import { Check, IndianRupee } from "lucide-react";

interface Props {
  price: string;
  title: string;
  features: string[];
  description: string;
  additionalFeature: string | undefined;
  active: boolean;
  disabled: boolean | undefined;
  index: number;
  handleCardClick: (index: number) => void;
}

const PriceCards = ({
  price,
  features,
  title,
  description,
  additionalFeature = undefined,
  disabled,
  active,
  index,
  handleCardClick,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Card
      className={`w-[265px] rounded-2xl scale-95 cursor-pointer ${
        active
          ? "shadow-xl scale-100 bg-primary text-white"
          : "shadow-xl hover:scale-100"
      } hover:shadow-button transition-all`}
      onClick={() => handleCardClick(index)}
    >
      <CardHeader className="px-4">
        <CardTitle className="text-[38px]">{title}</CardTitle>
        <CardDescription className={`text-[20px] ${active && "text-white"}`}>
          {description}
        </CardDescription>
        <p className="text-[14px]">{disabled && "(coming soon)"}</p>
      </CardHeader>
      <CardContent className="flex gap-4 flex-col px-4">
        <div className="flex items-end">
          <IndianRupee size={58} className="mb-3 mr-1" />
          <p className="text-[48px] font-semibold ml-[-12px]">{price}</p>
          <p className="text-[14px] mb-4 ml-2">Per member / month</p>
        </div>
        <div>
          <Button
            variant={active ? "ghost" : "default"}
            className={`shadow-button w-full ${
              active && "bg-white text-primary"
            }`}
            disabled={loading}
            onClick={() => {
              if (disabled) {
                return;
              }
              setLoading(true);
              !disabled && localStorage.setItem("price", price);
              disabled
                ? router.push("")
                : price === "0"
                ? router.push("/register")
                : router.push("/cart");
            }}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Get Started
          </Button>
        </div>
        <div className="flex mt-5">
          {additionalFeature ? (
            <p className="font-bold">Everything in {additionalFeature} plus:</p>
          ) : (
            <p className="font-bold">{title} includes:</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {features.map((feature) => (
            <div key={feature} className="flex gap-3 items-baseline">
              <Check className={active ? "text-white" : "text-primary"} />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCards;
