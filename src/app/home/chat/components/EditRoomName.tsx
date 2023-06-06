"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { UserType, RoomTypeRes } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import env from "@/utils/constant";
import { useRouter } from "next/navigation";

const updateRoomName = async ({
  room_id,
  room_name,
  tokenString,
}: {
  room_id: string;
  room_name: string;
  tokenString: string;
}) => {
  const res = await axios.put(
    `${env.url_api}/ws/updateRoomName`,
    {
      room_id,
      room_name,
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
  tokenString: string;
  roomData: RoomTypeRes;
  userData: UserType;
}

const EditRoomName: FC<PropType> = ({ tokenString, roomData, userData }) => {
  const [roomName, setRoomName] = useState("");
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: updateRoomName,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    mutation.mutate({
      room_id: roomData.room_id,
      room_name: roomName,
      tokenString,
    });

    if (mutation.isSuccess) route.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-2 mb-4">
        <Input
          inputType="text"
          onChange={handleChange}
          value={roomName}
          id="name"
          name="name"
          placeholder="room name"
          maxLength={20}
        />
      </div>

      <Button buttonType="submit">Change</Button>
    </form>
  );
};

export default EditRoomName;
