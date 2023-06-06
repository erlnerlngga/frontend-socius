"use client";

import { FC, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import EditRoomName from "./EditRoomName";
import { UserType, RoomTypeRes } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import env from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useWS } from "@/utils/websocket_provider";

const joinRoom = ({
  room_id,
  user_id,
}: {
  room_id: string;
  user_id: string;
}) => {
  const res = new WebSocket(`${env.url_ws}/ws/joinRoom/${room_id}/${user_id}`);

  return res;
};

const removeRoom = async ({
  user_id,
  room_id,
  tokenString,
  route,
}: {
  user_id: string;
  room_id: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.delete(
    `${env.url_api}/ws/remove/${room_id}/${user_id}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post");

  route.push("/home/chat");
  return;
};

interface PropType {
  tokenString: string;
  roomData: RoomTypeRes;
  userData: UserType;
}

const RoomCard: FC<PropType> = ({ tokenString, roomData, userData }) => {
  const [openChange, setOpenChange] = useState(false);
  const { setConn, conn } = useWS();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: removeRoom,
  });

  const handleRemove = () => {
    mutation.mutate({
      user_id: userData.user_id,
      room_id: roomData.room_id,
      tokenString,
      route,
    });
  };

  const handleOpenAddChange = () => {
    setOpenChange((cur) => !cur);
  };

  const handleJoinRoom = () => {
    if (conn !== null) {
      conn.close();
      setConn(null);
    }

    const res = joinRoom({
      room_id: roomData.room_id,
      user_id: userData.user_id,
    });

    if (res.OPEN) {
      setConn(res);
      route.push(`/home/chat/${roomData.room_id}`);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4 bg-slate-700 px-6 py-2 rounded-full">
        <p
          onClick={handleJoinRoom}
          className={`text-sm text-gray-300 cursor-pointer tracking-wider transition hover:text-indigo-300`}
        >
          {roomData.name_room}
        </p>

        {roomData.unread_message > 0 && (
          <span className="text-gray-300 text-xs bg-indigo-500 py-0.5 px-2 rounded-full">
            {roomData.unread_message}
          </span>
        )}

        <div className="flex items-center gap-2">
          <FaEdit
            onClick={handleOpenAddChange}
            className="cursor-pointer text-indigo-400 w-4 h-4 transition hover:text-opacity-80"
          />
          <FaTrashAlt
            onClick={handleRemove}
            className="cursor-pointer text-indigo-400 w-4 h-4 transition hover:text-red-400"
          />
        </div>
      </div>

      {openChange && (
        <EditRoomName
          tokenString={tokenString}
          userData={userData}
          roomData={roomData}
        />
      )}
    </div>
  );
};

export default RoomCard;
