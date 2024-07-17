"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PriceCard from "@/components/cards/normal-price-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, IndianRupeeIcon, Loader2Icon } from "lucide-react";
import { currentUser } from "@/lib/helpers/getTokenData";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { priceDetails } from "@/lib/config/price.config";
import { Icons } from "@/components/icons";
import UserButton from "@/components/buttons/user-button";
import moment from "moment";
import { addPayment } from "@/lib/actions/payment.action";

function Payment() {
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("1");
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [user, setUser] = useState<any>(null);
  const route = useRouter();
  const searchParams = useSearchParams();
  const createOrderId = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalBill * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async () => {
    try {
      setLoading(true);
      if (totalBill === 0) {
        route.push("/app/dashboard");
      }

      const orderId: string = await createOrderId();

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: totalBill * 100,
        currency: currency,
        name: "Project PlanIt",
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/payment/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            const data = {
              plan: selectedPlan,
              amount: totalBill,
              endDate: moment().add(period, "months"),
              startDate: moment(),
              period: period,
              orderId: orderId,
              paymentId: response.razorpay_payment_id,
              status: "SUCCESS",
            };

            const { success, err } = await addPayment(data);

            if (success) {
              toast.success("payment succeed");
              route.push("/payment/confirm");
            }
            if (err) {
              toast.error(err);
            }
            setLoading(false);
          } else {
            toast.error(res.message);
          }
        },
        prefill: {
          email: user?.email,
          name: user?.name,
        },
        theme: {
          color: "#7c3aed",
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        setLoading(false);
        toast.error(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const current_user = await currentUser();
      if (!current_user) {
        route.push("/signin");
      }
      setUser(current_user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setTotalBill(
        selectedPlan * parseInt(period) * (user.members?.length + 1)
      );
    }
    setLoading(false);
  }, [selectedPlan, period, user]);
  useEffect(() => {
    setSelectedPlan(
      priceDetails.find(
        (priceInfo) => priceInfo.name === searchParams.get("plan")
      )?.price || 0
    );
  }, [searchParams, searchParams.get("plan")]);

  return (
    <>
      <section className="flex flex-col gap-6 mx-5 sm:mx-10 2xl:mx-auto w-[90%] bg-background p-10">
        <h1 className="text-[26px] md:text-[30px] font-extrabold text-primary">
          {"You're"} almost there {user?.name}! Complete your order
        </h1>
        {/* 1st step choose period */}
        <h1 className="text-3xl font-bold">1. choose a period</h1>
        <Tabs value={period} onValueChange={setPeriod} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="1">Monthly</TabsTrigger>
            <TabsTrigger value="3">3 Months</TabsTrigger>
            <TabsTrigger value="6">6 Months</TabsTrigger>
            <TabsTrigger value="12">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 2nd step choose plan */}
        <h1 className="text-3xl font-bold">2. choose a plan</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {priceDetails.map((priceInfo) => (
            <button
              key={priceInfo.name}
              disabled={loading}
              onClick={() => setSelectedPlan(priceInfo.price)}
            >
              <PriceCard
                selected={selectedPlan === priceInfo.price}
                info={{
                  ...priceInfo,
                  period: parseInt(period),
                }}
              />
            </button>
          ))}
        </div>

        {/* 3rd step features */}
        <h1 className="text-3xl font-bold">3. Features</h1>
        <div className="flex flex-col gap-4">
          {priceDetails
            .filter((priceInfo) => priceInfo.price === selectedPlan)
            .map((priceInfo) => (
              <div
                key={priceInfo.name}
                className="flex flex-col gap-2 p-4 bg-surface rounded-lg"
              >
                {priceInfo.features.map((feature, index) => (
                  <p key={feature} className="flex items-center gap-2">
                    <CheckIcon size={16} className="text-primary" /> {feature}
                  </p>
                ))}
              </div>
            ))}
        </div>

        {/* 4th step total billing */}
        <h1 className="text-3xl font-bold">4. Billing</h1>
        <div className="flex flex-col gap-4 px-10 py-5 bg-muted rounded-lg">
          <div className="flex justify-between">
            <span>Selected plan</span>
            <span className="flex items-center">
              <IndianRupeeIcon size={12} />
              {selectedPlan}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Team members</span>
            <span>{user?.members?.length} members</span>
          </div>
          <div className="flex justify-between">
            <span>Time period</span>
            <span>{period} months</span>
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
              {totalBill}
            </span>
          </div>
        </div>
        <div>
          <Button disabled={loading} onClick={processPayment}>
            {loading && <Icons.spinner className="animate-spin" />}
            {totalBill === 0 ? "Start Free" : "Proceed to payment"}
          </Button>
        </div>
      </section>
    </>
  );
}

export default Payment;
