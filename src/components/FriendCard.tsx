"use client";

import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import userImage from "../../public/user.png";
import Button from "./Button";

interface PropType {
  isSearch: boolean;
  name: string;
  image: string;
}

const FriendCard: FC<PropType> = ({ isSearch, name, image }) => {
  return (
    <div className="bg-slate-700 rounded-lg sm:py-4 p-2.5 sm:px-6 flex flex-col gap-6 items-center">
      <div className="relative h-16 w-16 sm:h-28 sm:w-28">
        <Image
          fill
          src={image || userImage}
          alt={`${name} photo`}
          className="rounded-full object-cover"
        />
      </div>
      <p className="sm:text-lg text-gray-300 font-semibold tracking-wider">
        {name}
      </p>
      <Button buttonType="button" style={`${!isSearch && `bg-red-400`}`}>
        {isSearch ? "Add friend" : "Remove"}
      </Button>
    </div>
  );
};

export default FriendCard;