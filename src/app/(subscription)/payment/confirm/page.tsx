import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/helpers/getTokenData";
import { CreditCardIcon, IndianRupeeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConfirmPage = async () => {
  const user = await currentUser();
  return (
    <section className="flex flex-col items-center gap-2 mx-5 sm:mx-10 2xl:mx-auto w-[90%] bg-background p-10">
      <div className="bg-primary p-8 flex justify-center items-center rounded-full">
        <CreditCardIcon size={60} />
      </div>
      <p className="text-[40px] font-bold text-primary">Thank You</p>
      <span>Payment Done Successfully</span>
      <div className="w-full flex flex-col gap-4 px-10 py-5 bg-muted rounded-lg mt-4">
        <div className="flex justify-between">
          <span>Selected plan</span>
          <span className="flex items-center">
            <IndianRupeeIcon size={12} />
            {500}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Team members</span>
          <span>{user?.members?.length} members</span>
        </div>
        <div className="flex justify-between">
          <span>Time period</span>
          <span>{1} months</span>
        </div>
        <div className="flex justify-between border-t-2 border-background pt-2">
          <span>
            Total{" "}
            <span className="text-muted-foreground pl-2 text-[12px]">
              (Selected plan * Time period * Number of team members)
            </span>
          </span>
          <span className="flex items-center">
            <IndianRupeeIcon size={12} />
            {2500}
          </span>
        </div>
      </div>
      <Link href="/app/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </section>
  );
};

export default ConfirmPage;
