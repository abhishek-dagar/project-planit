import clsx from "clsx";
import React from "react";

type Props = { size?: number; selected: boolean; className?: string };

const UserRound = ({ size = 24, selected, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 21a6 6 0 0 0-12 0"
        className={clsx(
          "dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ",
          { "dark:!fill-[#9F54FF] fill-[#BD8AFF]": selected }
        )}
      />
      <circle
        cx="12"
        cy="11"
        r="4"
        className={clsx(
          "dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ",
          { "dark:!fill-[#9F54FF] fill-[#BD8AFF]": selected }
        )}
      />
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="4"
        className={clsx(
          "dark:group-hover:stroke-[#C8C7FF] transition-all dark:stroke-[#353346] stroke-[#C0BFC4] group-hover:stroke-[#7540A9]",
          { "dark:!stroke-[#C8C7FF] !stroke-[#7540A9] ": selected }
        )}
      />
    </svg>
  );
};

export { UserRound as UserRoundIcon };
export default UserRound;
