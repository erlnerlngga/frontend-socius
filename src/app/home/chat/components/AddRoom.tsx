"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import env from "@/utils/constant";
import { UserType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import LoadingButton from "@/components/LoadingButton";

const createRoom = async ({
  name_room,
  user_id,
  user_name,
  tokenString,
  route,
}: {
  name_room: string;
  user_id: string;
  user_name: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.post(
    `${env.url_api}/ws/createRoom`,
    {
      name_room: name_room.toLowerCase(),
      user_id,
      user_name,
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

  route.refresh();
  return;
};

interface PropType {
  tokenString: string;
  userData: UserType;
}

const AddRoom: FC<PropType> = ({ tokenString, userData }) => {
  const [roomName, setRoomName] = useState("");
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: createRoom,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    mutation.mutate({
      name_room: roomName,
      user_id: userData.user_id,
      user_name: userData.user_name,
      tokenString,
      route,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="name" className="text-gray-300">
          Room name
        </label>
        <Input
          inputType="text"
          onChange={handleChange}
          value={roomName}
          id="name"
          name="name"
          placeholder="room name"
        />
      </div>

      <Button
        buttonType="submit"
        style={`${
          mutation.isLoading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {mutation.isLoading ? <LoadingButton /> : "Create room"}
      </Button>
    </form>
  );
};

export default AddRoom;
