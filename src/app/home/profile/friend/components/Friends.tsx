"use client";

import FriendCard from "@/components/FriendCard";
import { UserFriendType, UserType } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FC } from "react";
import { useRouter } from "next/navigation";

const removeFriend = async ({
  user_id,
  friend_id,
  user_friend_id,
  tokenString,
  route,
}: {
  user_id: string;
  friend_id: string;
  user_friend_id: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.delete(
    `${env.url_api}/removeFriend/${user_id}/${friend_id}/${user_friend_id}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post data");

  console.log(res);
  route.refresh();
};

interface PropType {
  friendData: UserFriendType[];
  userData: UserType;
  tokenString: string;
}

const Friends: FC<PropType> = ({ friendData, userData, tokenString }) => {
  const route = useRouter();
  const mutation = useMutation({
    mutationFn: removeFriend,
  });

  const handleRemoveFriend = (friend_id: string, user_friend_id: string) => {
    mutation.mutate({
      user_id: userData.user_id,
      friend_id: friend_id,
      user_friend_id: user_friend_id,
      tokenString: tokenString,
      route,
    });
  };

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-4 flex-wrap">
      {friendData.map((val, idx) => {
        return (
          <FriendCard
            onCLick={() => handleRemoveFriend(val.user_id, val.user_friend_id)}
            key={idx}
            name={val.user_name}
            isSearch={false}
            image={val.photo_profile}
          />
        );
      })}
    </div>
  );
};

export default Friends;
