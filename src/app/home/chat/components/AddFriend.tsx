"use client";

import { FC, useState, ChangeEvent } from "react";
import Input from "@/components/Input";
import FriendCard from "./FriendCard";

interface UserType {
  user_id: string;
  user_name: string;
  email: string;
  photo_profile: string;
}

const AddFriend: FC = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);

    let searchUser = user.filter((val) => {
      return val.user_name.includes(e.currentTarget.value);
    });

    setUser(searchUser);
  };

  return (
    <>
      <form>
        <div className="flex flex-col gap-2 mb-8">
          <Input
            inputType="text"
            onChange={handleChange}
            value={search}
            id="name"
            name="name"
            placeholder="name"
          />
        </div>
      </form>

      <div className="sidebar flex flex-col overflow-y-scroll h-52 gap-4 mt-10">
        {Array(10)
          .fill(0)
          .map((val, idx) => {
            return <FriendCard key={idx} />;
          })}
      </div>
    </>
  );
};

export default AddFriend;
