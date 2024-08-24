"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroImage = () => {
  const { theme } = useTheme();
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    setImage(
      theme?.includes("light")
        ? "/temp-banner-real-light.png"
        : "/temp-banner-real-dark.png"
    );
  }, [theme]);
  return (
    <>
      {image && (
        <Image
          src={image}
          fill
          alt="bannerImage"
          className="relative w-full h-[100px] rounded-[inherit] border block"
        />
      )}
    </>
  );
};

export default HeroImage;
