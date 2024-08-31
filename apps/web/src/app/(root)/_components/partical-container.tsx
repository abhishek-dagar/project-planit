"use client";
import Particles from "@/components/magicui/particles";
import { useTheme } from "next-themes";

const ParticleContainer = () => {
  const { theme } = useTheme();
  return (
    <>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={theme?.includes("light") ? "#000000" : "#ffffff"}
        refresh
      />
    </>
  );
};

export default ParticleContainer;
