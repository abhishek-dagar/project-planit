import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import React from "react";

const ActivityCard = ({ activity }: any) => {
  return (
    <div className="w-full bg-muted px-3 py-2 rounded-md flex flex-col gap-3">
      <div>
        <p className="font-semibold text-lg">{activity.title}</p>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="bg-background h-6 w-6">
            <AvatarFallback className="bg-background h-6 w-6 text-xs">
              {activity?.changeBy?.name?.split("")[0] || "NA"}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs">{activity?.changeBy?.name}</p>
        </div>
        <p className="text-xs text-primary">
          {moment(activity.createdAt).format("MMM DD, hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
