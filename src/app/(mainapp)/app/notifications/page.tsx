import React from "react";

const Notifications = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="121"
          fill="none"
        >
          <g filter="url(#a)">
            <path
              fill="url(#b)"
              d="M40.199 34.84a6 6 0 0 1 4.755-2.342h30.092A6 6 0 0 1 79.8 34.84l16.955 22.04A6 6 0 0 1 98 60.54v21.959a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6v-21.96a6 6 0 0 1 1.244-3.657L40.2 34.84Z"
            />
            <path
              fill="url(#c)"
              fill-opacity=".5"
              fill-rule="evenodd"
              d="M75.046 34.498H44.954a4 4 0 0 0-3.17 1.561L24.83 58.1a4 4 0 0 0-.83 2.44v21.959a4 4 0 0 0 4 4h64a4 4 0 0 0 4-4v-21.96a4 4 0 0 0-.83-2.438L78.216 36.06a4 4 0 0 0-3.17-1.562Zm-30.092-2A6 6 0 0 0 40.2 34.84L23.244 56.88A6 6 0 0 0 22 60.54v21.959a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-21.96a6 6 0 0 0-1.244-3.657L79.8 34.84a6 6 0 0 0-4.755-2.342H44.954Z"
              clip-rule="evenodd"
            />
            <path
              fill="url(#d)"
              fill-opacity=".5"
              fill-rule="evenodd"
              d="M75.046 33.498H44.954a5 5 0 0 0-3.963 1.951L24.037 57.49A5 5 0 0 0 23 60.54v21.959a5 5 0 0 0 5 5h64a5 5 0 0 0 5-5v-21.96a5 5 0 0 0-1.037-3.048L79.01 35.45a5 5 0 0 0-3.963-1.952Zm-30.092-1A6 6 0 0 0 40.2 34.84L23.244 56.88A6 6 0 0 0 22 60.54v21.959a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-21.96a6 6 0 0 0-1.244-3.657L79.8 34.84a6 6 0 0 0-4.755-2.342H44.954Z"
              clip-rule="evenodd"
            />
            <path
              fill="url(#e)"
              d="M46.784 37.498a3 3 0 0 0-2.37 1.16l-11.653 15c-1.531 1.97-.127 4.84 2.369 4.84H48a1 1 0 0 1 1 1v6a3 3 0 0 0 3 3h17a3 3 0 0 0 3-3v-6a1 1 0 0 1 1-1h11.87c2.496 0 3.9-2.87 2.37-4.84l-11.655-15a3 3 0 0 0-2.37-1.16h-26.43Z"
            />
          </g>
          <defs>
            <linearGradient
              id="b"
              x1="46"
              x2="47.568"
              y1="87.206"
              y2="31.696"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#41407C" />
              <stop offset="1" stop-color="#41407C" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="c"
              x1="60"
              x2="60"
              y1="32.498"
              y2="65.998"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7F77F1" />
              <stop offset="1" stop-color="#7F77F1" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="d"
              x1="60"
              x2="60"
              y1="32.498"
              y2="65.998"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7F77F1" />
              <stop offset="1" stop-color="#7F77F1" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="e"
              x1="59.99"
              x2="59.99"
              y1="37.498"
              y2="74.498"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#43418D" />
              <stop offset="1" stop-color="#4C47AB" />
              <stop offset="1" stop-color="#615CC0" />
            </linearGradient>
            <filter
              id="a"
              width="152"
              height="152"
              x="-16"
              y="-11.501"
              color-interpolation-filters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="8" />
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow_16_9401"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_16_9401"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <span className="text-title-md">
        You don't have any cleared notifications
      </span>
      <span className="text-subtitle text-muted-foreground">
        Congratulations! You cleared your notifications 🎉
      </span>
    </div>
  );
};

export default Notifications;
