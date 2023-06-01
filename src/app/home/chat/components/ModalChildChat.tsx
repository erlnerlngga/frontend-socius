"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import userImage from "../../public/user.png";
import Image from "next/image";

import { IoClose } from "react-icons/io5";

interface PropType {
  close: () => void;

  content: FC;
}

const ModalChildChat: FC<PropType> = ({ close, content }) => {
  const Component = content;

  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-gray-900 bg-opacity-50 grid place-content-center"
      ></div>

      <div className="max-w-sm lg:max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full">
        <div className="relative bg-neutral-800 rounded-md shadow p-8">
          <div className="flex justify-end items-center mb-4">
            <IoClose
              onClick={close}
              className="w-6 h-6 cursor-pointer text-red-400 transition hover:text-opacity-80"
            />
          </div>

          <hr className="border-1 border-gray-500 mb-6" />
          <Component />
        </div>
      </div>
    </>
  );
};

export default ModalChildChat;
