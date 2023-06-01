"use client";

import { FC } from "react";
import Button from "@/components/Button";

const InputMessage: FC = () => {
  return (
    <form className="fixed w-full left-1 sm:left-1/2 sm:-translate-x-[38%] lg:-translate-x-[15%] xl:-translate-x-[25%] sm:w-3/4 bottom-8 2xl:-translate-x-[53%] px-4 lg:w-1/2">
      <div className="flex flex-col sm:flex-row w-full items-center gap-2">
        <input
          type="text"
          className={`outline-none w-full sm:basis-3/4 py-1.5 px-4 bg-neutral-800 text-gray-300 rounded-lg border-2 border-indigo-500`}
        />

        <Button
          buttonType="submit"
          style="sm:basis-1/4 border-2 border-indigo-500"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default InputMessage;
