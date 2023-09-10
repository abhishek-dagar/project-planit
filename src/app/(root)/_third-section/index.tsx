import Image from "next/image";
import React from "react";
import ListView from "@/assets/listView.png";
import BoardView from "@/assets/BoardView.png";
import ActionView from "@/assets/actionView.png";

const workflow = [
  { title: "List View", img: ListView },
  { title: "Board View", img: BoardView },
  { title: "Action View", img: ActionView },
];

const ThirdSection = () => {
  return (
    <div className="container flex flex-col gap-6 my-5">
      <div className="flex items-center justify-center flex-col">
        <p className="text-title-md lg:text-title-lg font-bold">
          Visual Workflows
        </p>
        <p className="text-subtitle font-light">
          Select a view and work the way you want.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {workflow.map((wflow) => (
          <div
            key={wflow.title}
            className="flex flex-col justify-center items-center gap-3"
          >
            <p className="text-[16px] font-bold ">{wflow.title}</p>
            <Image
              src={wflow.img}
              alt="ss"
              className="rounded-lg drop-shadow-2xl hover:drop-shadow-new scale-90 hover:scale-100 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
