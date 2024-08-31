import clsx from "clsx";
import React from "react";

type Props = { size?: number; selected: boolean; className?: string };

const Task = ({ size = 24, selected, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* <svg class="" width="16" height="16" viewBox="0 0 16 16" fill="#949496" role="img" focusable="false" aria-hidden="true" style="--icon-color: #949496;"> */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        transform={`translate(${size / 6}, ${size / 6})`}
        d="M12.5 11.2204C13.3829 10.8346 13.9999 9.95362 13.9999 8.92853V4.5C13.9999 3.11929 12.8806 2 11.4999 2H7.07132C6.04623 2 5.16524 2.61697 4.77942 3.49983L10 3.49983C11.3807 3.49983 12.5 4.61912 12.5 5.99983V11.2204ZM4.5 13.9998C3.11929 13.9998 2 12.8805 2 11.4998V7.07126C2 5.69055 3.11929 4.57126 4.5 4.57126L8.92853 4.57126C10.3092 4.57126 11.4285 5.69055 11.4285 7.07126V11.4998C11.4285 12.8805 10.3092 13.9998 8.92853 13.9998H4.5ZM8 9.49979C8 10.3282 7.32843 10.9998 6.5 10.9998C5.67157 10.9998 5 10.3282 5 9.49979C5 8.67136 5.67157 7.99979 6.5 7.99979C7.32843 7.99979 8 8.67136 8 9.49979ZM9.5 9.49979C9.5 11.1566 8.15685 12.4998 6.5 12.4998C4.84315 12.4998 3.5 11.1566 3.5 9.49979C3.5 7.84293 4.84315 6.49979 6.5 6.49979C8.15685 6.49979 9.5 7.84293 9.5 9.49979Z"
        className={clsx(
          "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#C0BFC4] group-hover:fill-[#7540A9]",
          { "dark:!fill-[#C8C7FF] !fill-[#7540A9] ": selected }
        )}
      />
    </svg>
  );
};

export { Task as TaskIcon };
export default Task;
