"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

const HeroImage = () => {
  const { theme } = useTheme();  
  return (
    <>
      <Image
        src={theme?.includes("light") ? "/temp-banner-real-light.png" : "/temp-banner-real-dark.png"}
        fill
        alt="bannerImage"
        className="relative w-full h-[100px] rounded-[inherit] border block"
      />
    </>
  );
};

export default HeroImage;
