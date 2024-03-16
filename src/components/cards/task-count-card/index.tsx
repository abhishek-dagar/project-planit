import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  Icon: LucideIcon;
  title: string;
  count: string;
  iconColor: string;
  iconBgColor: string;
}

const TaskCountCard = ({
  Icon,
  title,
  count,
  iconColor,
  iconBgColor,
}: Props) => {
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

export default TaskCountCard;
