import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface Props {
  title: string;
  count: number;
}
const CountCard = ({ title, count }: Props) => {
  return (
    <Card className="flex-1 min-w-[150px] [&:has(.content)]:hover:cursor-pointer [&_.content]:hover:bg-muted">
      <CardHeader>
        <CardTitle className="capitalize truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="content p-2 m-4 mt-0 rounded-lg">
        <p className="text-center font-bold text-4xl">{count}</p>
        <p className="text-center font-medium text-sm text-muted-foreground">
          Task {title}
        </p>
      </CardContent>
    </Card>
  );
};

export default CountCard;
