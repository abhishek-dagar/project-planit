import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import React from "react";

const ActivityCard = ({ activity }: { activity: any }) => {
  return (
    <div className="bg-secondary-background rounded-lg py-2 px-4 relative">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-background uppercase">
              {activity.changedBy?.username[0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold">{activity.changedBy?.username}</span>
        </div>
        <span className="text-[14px]">
          <strong className="text-primary">Task Name : </strong>
          {activity.task.title}
        </span>
        <span className="text-[14px] text-muted-foreground">
          {activity.comment} {moment(activity.createdAt).format("MMM DD")}
        </span>
        <div className="flex justify-end">
          <span className="text-[10px] text-primary">
            {moment(activity.createdAt).format("hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ActivityCardSkeleton = () => {
  return (
    <Skeleton className="bg-secondary-background rounded-lg h-[90px]"></Skeleton>
  );
};

export default ActivityCard;
