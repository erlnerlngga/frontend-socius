"use client";

import FriendCard from "@/components/FriendCard";

import { FC } from "react";

const Friends: FC = () => {
  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-4 flex-wrap">
      {Array(5)
        .fill(0)
        .map((val, idx) => {
          return (
            <FriendCard
              onCLick={() => {}}
              key={idx}
              name="erlan erlangga"
              isSearch={false}
              image=""
            />
          );
        })}
    </div>
  );
};

export default Friends;
