"use client";

import { FC } from "react";
import Link from "next/link";
import { NotificationType } from "@/utils/types";

interface PropType {
  notifData: NotificationType;
}

const CommentNotif: FC<PropType> = ({ notifData }) => {
  return (
    <Link
      href={`/home/comment/${notifData.post_id}`}
      className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto flex flex-col gap-4 bg-slate-700 shadow-lg cursor-pointer"
    >
      <p className="text-gray-300 font-semibold tracking-wider">
        {notifData.issuer_name} comment in your post
      </p>
    </Link>
  );
};

export default CommentNotif;
