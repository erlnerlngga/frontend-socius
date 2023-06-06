"use client";

import { FC } from "react";

const LoadingButton: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-indigo-100 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <p className="text-sm text-indigo-100">Loading ...</p>
    </div>
  );
};

export default LoadingButton;
