"use client";

import { FC, useState, ChangeEvent, useEffect } from "react";
import Input from "@/components/Input";
import FriendCard from "./FriendCard";
import { UserType, UserFriendType, RoomTypeRes } from "@/utils/types";
import env from "@/utils/constant";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingComps from "@/components/LoadingComps";

const getAllFriend = async ({
  user_id,
  tokenString,
}: {
  user_id: string;
  tokenString: string;
}) => {
  const res = await axios.get(`${env.url_api}/getAllFriend/${user_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth data");

  return res.data as UserFriendType[];
};

interface PropType {
  tokenString: string;
  userData: UserType;
  roomData?: RoomTypeRes[];
}

const AddFriend: FC<PropType> = ({ tokenString, userData, roomData }) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllFriend"],
    queryFn: () => getAllFriend({ user_id: userData.user_id, tokenString }),
  });

  const [dataUser, setDataUser] = useState<UserFriendType[]>([]);
  const [user, setUser] = useState<UserFriendType[]>([]);
  const [search, setSearch] = useState("");
  const [roomID, setRoomID] = useState(`${roomData && roomData[0].room_id}`);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      setDataUser(data);
    }
  }, [isSuccess, data]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoomID(e.currentTarget.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);

    let searchUser = dataUser.filter((val) => {
      return val.user_name.includes(e.currentTarget.value);
    });

    setUser(searchUser);
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <LoadingComps />
      </div>
    );
  }

  return (
    <>
      <form>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="search" className="text-gray-400">
            Search name
          </label>
          <Input
            inputType="text"
            onChange={handleChange}
            value={search}
            id="search"
            name="search"
            placeholder="search"
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label htmlFor="room" className="text-gray-400">
            Room
          </label>
          <select
            value={roomID}
            onChange={handleSelect}
            name="room"
            id="room"
            className="px-4 py-1.5 rounded-lg outline-none text-gray-300 bg-neutral-800 border-2 border-indigo-500"
          >
            {roomData &&
              roomData.map((val, idx) => {
                return (
                  <option
                    value={val.room_id}
                    key={idx}
                    className="px-4 py-2 rounded-lg outline-none text-gray-300 bg-neutral-800 border-2"
                  >
                    {val.name_room}
                  </option>
                );
              })}
          </select>
        </div>
      </form>

      <div className="sidebar flex flex-col overflow-y-scroll h-52 gap-4 mt-10">
        {user.map((val, idx) => {
          return (
            <FriendCard
              key={idx}
              user={val}
              tokenString={tokenString}
              room_id={roomID}
            />
          );
        })}
      </div>
    </>
  );
};

export default AddFriend;
