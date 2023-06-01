"use client";

import { FC } from "react";
import InputMessage from "./InputMessage";
import { FaUserPlus } from "react-icons/fa";
import ModalChat from "./ModalChat";
import AddFriend from "./AddFriend";
import userImage from "../../../../../public/user.png";
import Image from "next/image";

const ChatBody: FC = () => {
  return (
    <section className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 sm:ml-6 flex flex-col gap-20  shadow-lg">
      <ModalChat content={AddFriend}>
        <FaUserPlus className="fixed 2xl:top-6 top-20 right-4 z-20 2xl:right-[19%] h-8 w-8 text-indigo-500 cursor-pointer shadow-lg" />
      </ModalChat>

      <>
        {Array(50)
          .fill(0)
          .map((val, idx) => {
            return (
              <div key={idx} className="self-end flex gap-4 items-center w-2/3">
                <div>
                  <p className="text-indigo-500 tracking-wider font-semibold mb-2 px-4 text-right">
                    {"erlan erlangga"}
                  </p>
                  <p className="py-2 px-4 rounded-lg tracking-wide leading-relaxed shadow-lg text-gray-300 bg-indigo-800">
                    {
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugit?"
                    }
                  </p>
                </div>

                <div className="hidden md:block">
                  <Image
                    width={100}
                    height={100}
                    src={userImage}
                    alt={`${idx}`}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            );
          })}
      </>

      <InputMessage />
    </section>
  );
};

export default ChatBody;
