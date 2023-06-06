"use client";

import { FC } from "react";

const LoadingComps: FC = () => {
  return (
    <div className="flex items-center gap-4 text-center">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <p className="text-xl font-semibold tracking-wider text-indigo-300">
        Loading ...
      </p>
    </div>
  );
};

export default LoadingComps;
