import React from "react";
import { Card } from "../ui/card";
import { IndianRupee } from "lucide-react";
interface Props {
  price: string;
  month: string;
  selected: boolean;
  handleClick: (ind: number) => void;
  index: number;
}
const PricePeriodCard = ({
  price,
  month,
  selected,
  handleClick,
  index,
}: Props) => {
  return (
    <Card
      className={`p-8 shadow-md ${selected ? "bg-primary text-white" : ""}`}
      onClick={() => handleClick(index)}
    >
      <div>
        <p className="text-center text-[18px]">{month} Months</p>
        <div className="flex items-end">
          <IndianRupee size={58} className="mb-3" />
          <p className="text-[48px] font-semibold ml-[-12px]">{price}</p>
          <p className="text-[14px] mb-4 ml-2">INR / month</p>
        </div>
      </div>
    </Card>
  );
};

export default PricePeriodCard;
