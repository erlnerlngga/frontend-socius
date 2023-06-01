"use client";

import { FC } from "react";
import Image from "next/image";
import userImage from "../../../../../public/user.png";
import { FaUserPlus } from "react-icons/fa";

interface UserType {
  user_id: string;
  user_name: string;
  email: string;
  photo_profile: string;
}

const FriendCard: FC = () => {
  return (
    <div className="flex items-center justify-between px-4">
      <Image
        width={50}
        height={50}
        src={userImage}
        alt={"lls"}
        className="rounded-full object-cover"
      />

      <p className="text-gray-300 ">{"erlan erlangga"}</p>

      <FaUserPlus className="text-indigo-500 w-6 h-6 cursor-pointer" />
    </div>
  );
};

export default FriendCard;
