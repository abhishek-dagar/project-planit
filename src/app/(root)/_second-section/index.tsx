import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { features } from "@/lib/config/features.config";
import React from "react";

const SecondSection = () => {
  return (
    <div className="container bg-[#3971ec17] flex flex-col gap-6 rounded-2xl py-16">
      <div className="flex items-center justify-center flex-col">
        <p className="text-title-md lg:text-title-lg font-bold">
          For Several Industries
        </p>
        <p className="text-subtitle font-light">
          For endless possibilities and customization options, it is good fit
          for many types of Business, including:
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {features.map((feature) => (
          <Card
            key={feature.name}
            className="flex items-center flex-wrap w-full md:w-[160px] h-[160px] shadow-lg hover:shadow-button scale-90 hover:scale-100 transition-all"
          >
            <CardContent className="p-6 w-full">
              <CardDescription className="flex items-center flex-col text-center gap-4">
                <feature.icon style={{ fontSize: "48px" }} />
                {feature.name}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
