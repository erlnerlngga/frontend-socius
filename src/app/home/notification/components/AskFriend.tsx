"use client";

import { FC, use, useState } from "react";
import Button from "@/components/Button";

const AskFriend: FC = () => {
  const [msg, setMsg] = useState("");
  const [isClick, setIsClick] = useState(false);

  const handleAccept = () => {
    // insert new user friend issuer to notifier

    // insert new user friend notifier to issuer

    // update Accept column become yes

    setMsg(`${"erlan"} is your friend now`);
    setIsClick(true);
  };

  const handleReject = () => {
    // update Accept column become no

    setMsg(`you reject ${"erlan"} become your friend`);
    setIsClick(true);
  };

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto flex flex-col gap-4 bg-slate-700 shadow-lg">
      <p className="text-gray-300 font-semibold tracking-wider">
        {isClick ? msg : `${"erlan"} ask for a friend`}
      </p>

      {!isClick && (
        <div className="flex items-center gap-4">
          <Button buttonType="button" onClick={handleAccept}>
            Accept
          </Button>
          <Button buttonType="button" onClick={handleReject} style="bg-red-400">
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default AskFriend;
