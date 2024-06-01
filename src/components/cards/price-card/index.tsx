import { CardBody, CardContainer, CardItem } from "@/components/common/3d-card";
import { PriceDetailType } from "@/lib/types/price.type";
import { CheckIcon } from "lucide-react";
import React from "react";

interface PriceCardProps {
  info: PriceDetailType;
}

const PriceCard = ({ info }: PriceCardProps) => {
  return (
    <CardContainer className="inter-var rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardBody className="relative group/card w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold">
          {info.name}
          <h2 className="text-6xl ">${info.price}</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2"
        >
          {info.description}
          <ul className="my-4 flex flex-col gap-2">
            {info.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default PriceCard;
