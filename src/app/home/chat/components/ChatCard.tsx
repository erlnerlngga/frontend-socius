"use client";

import { FC } from "react";
import Image from "next/image";
import userImage from "../../../../../public/user.png";
import { MessageType } from "@/utils/types";

interface PropType {
  message: MessageType[];
}

const ChatCard: FC<PropType> = ({ message }) => {
  return (
    <>
      {message.map((val) => {
        if (val.type === "self") {
          return (
            <div
              key={val.message_id}
              className="self-end flex gap-4 items-center w-2/3"
            >
              <div>
                <p className="text-indigo-500 tracking-wider font-semibold mb-2 px-4 text-right">
                  {val.user_name}
                </p>
                <p className="py-2 px-4 rounded-lg tracking-wide leading-relaxed shadow-lg text-gray-300 bg-indigo-800">
                  {val.content}
                </p>
              </div>

              <div className="hidden md:block">
                <div className="relative h-16 w-16">
                  <Image
                    fill
                    src={val.photo_profile || userImage}
                    alt={`${val.user_name} photo`}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={val.message_id}
              className="self-start flex gap-4 items-center w-2/3"
            >
              <div className="hidden md:block">
                <div className="relative h-16 w-16">
                  <Image
                    fill
                    src={val.photo_profile || userImage}
                    alt={`${val.user_name} photo`}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              <div>
                <p className="text-indigo-500 tracking-wider font-semibold mb-2 px-4">
                  {val.user_name}
                </p>
                <p className="py-2 px-4 rounded-lg tracking-wide leading-relaxed shadow-lg text-gray-300 bg-slate-700">
                  {val.content}
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default ChatCard;
