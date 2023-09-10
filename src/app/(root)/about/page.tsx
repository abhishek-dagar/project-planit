import Image from "next/image";
import React from "react";
import layered from "@/assets/layered-waves-haikei.svg";

const About = () => {
  return (
    <>
      <div className="container relative">
        <div className="flex flex-col justify-center items-center mt-24 py-14 md:p-14">
          <p className="text-[24px] font-semibold font-[cursive] z-10">
            We Love What We Do
          </p>
          <p className="text-[28px] md:text-[48px] text-center font-bold font-[cursive] z-10">
            Our talented teams craft the best code and design amazing user
            experience or our clients
          </p>
        </div>
      </div>
      <Image
        src={layered}
        alt="svg"
        className="w-screen -mt-40 md:-mt-96 lg:-mt-[30rem] z-0"
      />
    </>
  );
};

export default About;
