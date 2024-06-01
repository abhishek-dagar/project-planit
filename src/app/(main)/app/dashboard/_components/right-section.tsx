"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import moment from "moment";
import React from "react";
import ActivityCard from "./activity-card";

const RightSection = () => {
  return (
    <div className=" flex flex-col gap-6 px-6 lg:pl-0">
      <Card>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={moment().toDate()}
            disabled={(date: any) => date < new Date("1900-01-01")}
          />
        </CardContent>
      </Card>
      <Card className="h-[calc(100vh)] overflow-auto relative">
        <CardHeader className="bg-black/10 backdrop-blur-lg sticky top-0 left-0 border-b pb-3">
          {"Today's Activity"}
        </CardHeader>
        <CardContent className="pt-3 flex flex-col gap-2 justify-center">
          {Array.from({ length: 1000 }, (_, index) => (
            <ActivityCard key={index} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSection;
