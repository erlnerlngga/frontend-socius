"use client";

import FriendCard from "@/components/FriendCard";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import env from "@/utils/constant";
import { FC } from "react";
import { UserType } from "@/utils/types";
import LoadingComps from "@/components/LoadingComps";

const getFriend = async ({
  email,
  tokenString,
}: {
  email: string;
  tokenString: string;
}) => {
  const res = await axios.get(`${env.url_api}/getUserbyEmail/${email}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth data");

  return res.data as UserType;
};

const createNotif = async ({
  issuer,
  issuer_name,
  notifier,
  notifier_name,
  status,
  accept,
  post_id,
  type,
  tokenString,
}: {
  issuer: string;
  issuer_name: string;
  notifier: string;
  notifier_name: string;
  status: string;
  accept: string;
  post_id: null;
  type: string;
  tokenString: string;
}) => {
  const res = await axios.post(
    `${env.url_api}/createNotification`,
    {
      issuer,
      issuer_name,
      notifier,
      notifier_name,
      status,
      accept,
      post_id,
      type,
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

  return res.data;
};

interface PropType {
  searchParams: { email: string };
  tokenString: string;
  userData: UserType;
}

const Friends: FC<PropType> = ({ searchParams, tokenString, userData }) => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["getUserbyEmail"],
    queryFn: () => getFriend({ email: searchParams.email, tokenString }),
  });

  const mutation = useMutation({
    mutationFn: createNotif,
  });

  const handleAskForFriend = () => {
    if (isSuccess) {
      mutation.mutate({
        issuer: userData.user_id,
        issuer_name: userData.user_name,
        notifier: data.user_id,
        notifier_name: data.user_name,
        status: "not_read",
        accept: "none",
        post_id: null,
        type: "ask_friend",
        tokenString: tokenString,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center  gap-4 flex-wrap">
        <LoadingComps />
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-4 flex-wrap">
      {isSuccess && (
        <FriendCard
          onCLick={handleAskForFriend}
          name={data.user_name}
          isSearch={true}
          image={data.photo_profile}
          isSuccess={mutation.isSuccess}
        />
      )}
    </div>
  );
};

export default Friends;
