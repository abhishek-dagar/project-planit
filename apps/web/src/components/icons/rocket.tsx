import clsx from "clsx";
import React from "react";

type Props = { size?: number; selected: boolean; className?: string };

const Rocket = ({ size = 24, selected, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
        clipRule="evenodd"
        className={clsx(
          "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#C0BFC4] group-hover:fill-[#7540A9]",
          { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected }
        )}
      />
      <path
        d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"
        className={clsx(
          "dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ",
          { "dark:!fill-[#9F54FF] fill-[#BD8AFF]": selected }
        )}
      />
    </svg>
  );
};

export { Rocket as RocketIcon };
export default Rocket;
