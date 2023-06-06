"use client";

import { FC, useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import env from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { NotificationType, UserType } from "@/utils/types";

const addFriend = async ({
  user_id,
  friend_id,
  tokenString,
}: {
  user_id: string;
  friend_id: string;
  tokenString: string;
}) => {
  const res = await axios.post(
    `${env.url_api}/addNewFriend`,
    {
      user_id,
      friend_id,
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

const updateAddFriendNotification = async ({
  notification_id,
  accept,
  tokenString,
}: {
  notification_id: string;
  accept: string;
  tokenString: string;
}) => {
  const res = await axios.put(
    `${env.url_api}/updateAddFriendNotification`,
    {
      notification_id,
      accept,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post");

  return res.data;
};

interface PropType {
  userData: UserType;
  tokenString: string;
  notifData: NotificationType;
}

const AskFriend: FC<PropType> = ({ userData, tokenString, notifData }) => {
  const [msg, setMsg] = useState<{ text: string; isAccept: boolean }>({
    text: "",
    isAccept: false,
  });
  const [isClick, setIsClick] = useState(false);

  const mutationAdd1 = useMutation({
    mutationFn: addFriend,
  });
  const mutationAdd2 = useMutation({
    mutationFn: addFriend,
  });

  const mutationUpdateAdd = useMutation({
    mutationFn: updateAddFriendNotification,
  });

  const handleAccept = () => {
    // insert new user friend issuer to notifier
    mutationAdd1.mutate({
      user_id: notifData.issuer,
      friend_id: notifData.notifier,
      tokenString,
    });

    // insert new user friend notifier to issuer
    mutationAdd2.mutate({
      user_id: notifData.notifier,
      friend_id: notifData.issuer,
      tokenString,
    });

    // update Accept column become yes
    mutationUpdateAdd.mutate({
      notification_id: notifData.notification_id,
      accept: "yes",
      tokenString,
    });

    setMsg({
      text: `${notifData.issuer_name} is your friend now`,
      isAccept: true,
    });
    setIsClick(true);
  };

  const handleReject = () => {
    // update Accept column become no
    mutationUpdateAdd.mutate({
      notification_id: notifData.notification_id,
      accept: "no",
      tokenString,
    });

    setMsg({
      text: `you reject ${notifData.issuer_name} become your friend`,
      isAccept: false,
    });
    setIsClick(true);
  };

  let message = isClick
    ? msg?.text
    : `${notifData.issuer_name} ask for a friend`;
  if (notifData.accept === "yes") {
    message = `${notifData.issuer_name} is your friend now`;
  }

  if (notifData.accept === "no") {
    message = `you reject ${notifData.issuer_name} become your friend`;
  }

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto flex flex-col gap-4 bg-slate-700 shadow-lg">
      <p className="text-gray-300 font-semibold tracking-wider">{message}</p>

      {!isClick && notifData.accept === "none" ? (
        <div className="flex items-center gap-4">
          <Button buttonType="button" onClick={handleAccept}>
            Accept
          </Button>
          <Button buttonType="button" onClick={handleReject} style="bg-red-400">
            Reject
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AskFriend;
