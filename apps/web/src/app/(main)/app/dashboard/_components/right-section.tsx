"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import moment from "moment";
import React, { useState } from "react";
import ActivityCard from "./activity-card";

interface RightSectionProps {
  activities: any;
}

const RightSection = ({ activities }: RightSectionProps) => {
  const [date, setDate] = useState<Date | undefined>(moment().toDate());
  return (
    <div className=" flex flex-col gap-6 px-6 lg:pl-0">
      <Card>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date: any) =>
              date < new Date("1900-01-01") || date > new Date()
            }
          />
        </CardContent>
      </Card>
      <Card className="h-[calc(100vh)] overflow-auto relative">
        <CardHeader className="bg-black/10 backdrop-blur-lg sticky top-0 left-0 border-b pb-3">
          {moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
            ? "Today's Activity"
            : "Activity on " + moment(date).format("MMM DD, YYYY")}
        </CardHeader>
        <CardContent className="pt-3 flex flex-col gap-2 justify-center">
          {activities
            .filter(
              (activity: any) =>
                moment(activity?.createdAt).format("YYYY-MM-DD") ===
                moment(date).format("YYYY-MM-DD")
            )
            .map((activity: any, index: number) => (
              <ActivityCard key={index} activity={activity} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSection;
