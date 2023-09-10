import Image from "next/image";
import React from "react";
import WorkAnywhere from "@/assets/anywhere-removebg-preview.png";

// const workflow = [
//   { title: "List View", img: ListView },
//   { title: "Board View", img: BoardView },
//   { title: "Action View", img: ActionView },
// ];

const ForthSection = () => {
  return (
    <div className="container flex flex-col gap-6 my-5">
      <div className="flex items-center justify-center flex-col">
        <p className="text-title-md lg:text-title-lg font-bold">
          Work Anywhere
        </p>
        <p className="text-subtitle font-light">
          Access your list on any device
        </p>
      </div>
      <div className="flex justify-center gap-6">
        {/* {workflow.map((wflow) => (
          <div
            key={wflow.title}
            className="flex flex-col justify-center items-center gap-3"
          > */}
        {/* <p className="text-[16px] font-bold ">{wflow.title}</p> */}
        <Image
          src={WorkAnywhere}
          alt="ss"
          className="rounded-lg drop-shadow-2xl"
        />
        {/* </div>
        ))} */}
      </div>
    </div>
  );
};

export default ForthSection;
