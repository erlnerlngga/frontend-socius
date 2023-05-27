"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import userImage from "../../public/user.png";
import Image from "next/image";

interface PropType {
  close: () => void;
  children?: ReactNode;
  image: string;
}

const ModalChild: FC<PropType> = ({ close, children, image }) => {
  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-gray-900 bg-opacity-50 grid place-content-center"
      ></div>

      <div
        className={`w-full max-w-lg sm:max-w-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <div className="relative w-full h-[500px] sm:h-[700px]">
          <Image
            fill
            src={image || userImage}
            alt="zoom photo"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default ModalChild;
