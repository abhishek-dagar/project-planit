import clsx from "clsx";
import React from "react";

type Props = { size?: number; selected: boolean; className?: string };

const Notification = ({ size = 24, selected, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
        clipRule="evenodd"
        className={clsx(
          "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#C0BFC4] group-hover:fill-[#7540A9]",
          { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected }
        )}
      />
    </svg>
  );
};
export { Notification as NotificationIcon };
export default Notification;
