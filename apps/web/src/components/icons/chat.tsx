import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

type Props = { size?: number; selected: boolean; className?: string };

const Chat = ({ size = 24, selected, className }: Props) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   fill="currentColor"
    //   width={size}
    //   height={size}
    //   className={className}
    // >
    //   <path
    //     fillRule="evenodd"
    //     d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
    //     clipRule="evenodd"
    //     className={clsx(
    //       "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#C0BFC4] group-hover:fill-[#7540A9]",
    //       { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected }
    //     )}
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        className={cn(
          "stoke-2 stoke-[#7540A9] group-hover:fill-[#7540A9] group-hover:stroke-[#C8C7FF]",
          { "fill-[#7540A9] stroke-[#C8C7FF]": selected }
        )}
      />
    </svg>
  );
};
export { Chat as ChatIcon };
export default Chat;
