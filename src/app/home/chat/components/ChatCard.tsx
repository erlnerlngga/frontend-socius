"use client";

import { FC } from "react";
import Image from "next/image";
import userImage from "../../../../../public/user.png";

const ChatCard: FC = () => {
  return (
    <>
      <div className="self-start flex gap-4 items-center w-2/3">
        <div className="hidden md:block">
          <Image
            width={100}
            height={100}
            src={userImage}
            alt={`${1}`}
            className="rounded-full object-cover"
          />
        </div>

        <div>
          <p className="text-indigo-500 tracking-wider font-semibold mb-2 px-4">
            {"erlan erlangga"}
          </p>
          <p className="py-2 px-4 rounded-lg tracking-wide leading-relaxed shadow-lg text-gray-300 bg-slate-700">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugit?"
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
