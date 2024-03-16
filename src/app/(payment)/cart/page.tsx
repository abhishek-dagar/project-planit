"use client";
import { PaymentCard } from "@/components/cards/payment";
import PricePeriodCard from "@/components/cards/price-period-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchPlan } from "@/lib/actions/price.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [selectedPlan, setSelectedPlan]: any = useState();
  const [user, setUser]: any = useState();
  const [index, setIndex]: any = useState(0);
  const [email, setEmail]: any = useState("");
  const router = useRouter();

  const handleIndex = (ind: number) => {
    setIndex(ind);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    localStorage.removeItem("email");
    fetchPlan(localStorage.getItem("price")).then((pricePlan) => {
      setSelectedPlan(pricePlan);
    });
    fetchUser("").then(({ user }: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return (
    <div className="px-4 md:container my-4">
      <div className="md:container flex flex-col gap-10">
        {/* First section */}
        <div className="flex flex-col gap-5">
          <h1 className="text-[26px] md:text-[37px] font-extrabold text-primary">
            {"You're almost there! Complete your order"}
          </h1>
          <div className="flex gap-3 items-baseline">
            <p>Selected Plan: </p>
            <p className="font-bold text-[20px]"> {selectedPlan?.title} </p>
          </div>
          <p className="font-bold text-[28px]">Features</p>
          {selectedPlan?.features &&
            selectedPlan?.features.map((feature: any) => {
              return (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="text-primary text-end" />
                  <p className="text-end">{feature}</p>
                </div>
              );
            })}
        </div>
        {/* Choose Plan */}
        {!selectedPlan ? (
          <p className="text-[26px] md:text-[37px] font-bold">
            1. Choose a period
          </p>
        ) : selectedPlan?.price === "0" ? (
          <div className="text-[26px] md:text-[37px] font-bold">
            1. Free Plan Selected
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-[26px] md:text-[37px] font-bold">
              1. Choose a period
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <PricePeriodCard
                price={selectedPlan?.price}
                month="1"
                selected={index === 0}
                handleClick={handleIndex}
                index={0}
              />
              <PricePeriodCard
                price={`${12 * selectedPlan?.price}`}
                month="12"
                selected={index === 1}
                handleClick={handleIndex}
                index={1}
              />
            </div>
          </div>
        )}

        {/* checking user is loggedIn or not */}
        {user ? (
          <div>
            <p className="text-[26px] md:text-[37px] font-bold">
              2. LoggedIn as {user?.username}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="text-[26px] md:text-[37px] font-bold">
              2. Create Your Account
            </p>
            <div>
              <p className="text-[26px] md:text-[18px] font-light">
                Already Have a account?{" "}
                <Link href={"/login"} className="text-primary">
                  Log in
                </Link>
              </p>
              <div className="flex md:w-[40%] gap-8 mt-2">
                <Input
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white"
                  onChange={handleEmail}
                />
                <Button
                  onClick={() => {
                    localStorage.setItem("email", email);
                    router.push("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* If user loggedIn create a payment section */}
        <div className="flex flex-col gap-5">
          <p className="text-[26px] md:text-[37px] font-bold">
            3. Select a Payment
          </p>
          {!user && <PaymentCard />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
