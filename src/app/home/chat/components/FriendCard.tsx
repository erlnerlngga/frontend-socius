"use client";

import { FC } from "react";
import Image from "next/image";
import userImage from "../../../../../public/user.png";
import { FaUserPlus } from "react-icons/fa";
import { UserFriendType } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import env from "@/utils/constant";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

const addFriend = async ({
  room_id,
  user_id,
  user_name,
  tokenString,
  route,
}: {
  room_id: string;
  user_id: string;
  user_name: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.post(
    `${env.url_api}/ws/addFriend`,
    {
      room_id,
      user_id,
      user_name,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post data");

  route.refresh();
  return;
};

interface PropType {
  user: UserFriendType;
  tokenString: string;
  room_id: string;
}

const FriendCard: FC<PropType> = ({ user, tokenString, room_id }) => {
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: addFriend,
  });

  if (mutation.isSuccess) {
    return (
      <h1 className="text-indigo-300 text-center">
        Success add {user.user_name} into rooms 😎😎
      </h1>
    );
  }

  return (
    <div className="flex items-center justify-between px-4">
      <div className="relative h-10 w-10">
        <Image
          fill
          src={user.photo_profile || userImage}
          alt={`${user.user_name} photo`}
          className="rounded-full object-cover"
        />
      </div>

      <p className="text-gray-300 ">{user.user_name}</p>

      <FaUserPlus
        onClick={() =>
          mutation.mutate({
            room_id,
            user_id: user.user_id,
            user_name: user.user_name,
            tokenString,
            route,
          })
        }
        className="text-indigo-500 w-6 h-6 cursor-pointer"
      />
    </div>
  );
};

export default FriendCard;
