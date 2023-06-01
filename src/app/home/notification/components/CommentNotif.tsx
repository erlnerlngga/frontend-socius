"use client";

import { FC } from "react";
import Link from "next/link";

const CommentNotif: FC = () => {
  return (
    <Link
      href={"/home/comment/1"}
      className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto flex flex-col gap-4 bg-slate-700 shadow-lg"
    >
      <p className="text-gray-300 font-semibold tracking-wider">
        {"erlan"} comment in your post
      </p>
    </Link>
  );
};

export default CommentNotif;
