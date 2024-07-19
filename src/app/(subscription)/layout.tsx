import { Boxes } from "@/components/common/background-boxes";
import SimpleBackgroundBoxes from "@/components/common/simple-background-boxes";
import { Viewport } from "next";
import Script from "next/script";

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <SimpleBackgroundBoxes className="-z-1" />
        <div className="z-20 h-full w-full py-20 overflow-auto overflow-x-hidden">{children}</div>
      </div>
    </>
  );
}
