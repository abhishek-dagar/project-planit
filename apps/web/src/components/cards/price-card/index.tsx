"use client";
import { CardBody, CardContainer, CardItem } from "@/components/common/3d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceDetailType } from "@/lib/types/price.type";
import { cn } from "@/lib/utils";
import { CheckIcon, IndianRupeeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface PriceCardProps {
  info: PriceDetailType;
  active?: boolean;
}

const PriceCard = ({ info, active }: PriceCardProps) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CardContainer className="inter-var rounded-lg border-t-4 border-primary bg-muted backdrop-blur-sm text-card-foreground shadow-sm">
        <CardBody className="relative group/card w-full md:!w-[350px] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold">
            <div className="flex items-center gap-2 capitalize">
              {info.name}
              {active && <Badge className="ml-2">Active</Badge>}
            </div>
            <h2 className="text-6xl flex">
              <IndianRupeeIcon size={60} />
              {info.price}
            </h2>
          </CardItem>
          <CardItem
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2"
          >
            {info.description}
            <ul className="my-4 flex flex-col gap-2">
              {info.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardItem>
          <div className="flex justify-end items-center mt-8">
            {/* {!active && info.name !== "free" && ( */}
            <Button
              variant={"link"}
              onClick={() => {
                router.push("/payment?plan=" + info.name);
              }}
              className={cn(
                "px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold invisible",
                { visible: !active && info.name !== "free" }
              )}
            >
              Get Started Now
            </Button>
            {/* )} */}
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

export default PriceCard;
