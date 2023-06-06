"use client";

import { ChangeEvent, FC } from "react";
import Button from "@/components/Button";

interface PropType {
  handleMsg: (e: ChangeEvent<HTMLInputElement>) => void;
  msg: string;
  handleSend: () => void;
}

const InputMessage: FC<PropType> = ({ handleMsg, msg, handleSend }) => {
  return (
    <div className="fixed w-full left-1 sm:left-1/2 sm:-translate-x-[38%] lg:-translate-x-[15%] xl:-translate-x-[25%] sm:w-3/4 bottom-8 2xl:-translate-x-[53%] px-4 lg:w-1/2">
      <div className="flex flex-col sm:flex-row w-full items-center gap-2">
        <input
          onChange={handleMsg}
          value={msg}
          type="text"
          className={`outline-none w-full sm:basis-3/4 py-1.5 px-4 bg-neutral-800 text-gray-300 rounded-lg border-2 border-indigo-500`}
        />

        <Button
          onClick={handleSend}
          buttonType="button"
          style="sm:basis-1/4 border-2 border-indigo-500"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputMessage;
