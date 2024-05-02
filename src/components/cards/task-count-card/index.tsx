import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import React from "react";

export interface TaskCountCardProps {
  Icon: LucideIcon;
  title: string;
  count: number;
  iconColor: string;
  iconBgColor: string;
}

const TaskCountCard = ({
  Icon,
  title,
  count,
  iconColor,
  iconBgColor,
}: TaskCountCardProps) => {
  return (
    <Card className="bg-background p-4 px-6 rounded-xl">
      <CardTitle>
        <div
          className="bg-secondary-background max-w-[50px] max-h-[50px] flex justify-center items-center py-3 rounded-lg"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon color={iconColor} size={18} />
        </div>
      </CardTitle>
      <CardDescription
        className="mt-4 text-[20px] uppercase font-semibold overflow-hidden truncate"
        style={{ color: iconColor }}
      >
        {title}
      </CardDescription>
      <CardFooter className="pl-1 py-1">
        <span className="text-foreground capitalize font-medium">
          {count} tasks
        </span>
      </CardFooter>
    </Card>
  );
};
export const TaskCountCardSkeleton = () => {
  return (
    <Card className="bg-background p-4 px-6 rounded-xl">
      <CardTitle>
        <Skeleton className="bg-secondary-background w-[50px] h-[50px] rounded-lg" />
      </CardTitle>
      <div className="mt-4">
        <Skeleton className="bg-secondary-background w-full h-[20px]" />
      </div>
      <CardFooter className="pl-1 py-1">
        <Skeleton className="bg-secondary-background w-[75px] h-[20px]" />
      </CardFooter>
    </Card>
  );
};

export default TaskCountCard;
