"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const AddRoom: FC = () => {
  const [roomName, setRoomName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    console.log(roomName);
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

      <Button buttonType="submit">Create room</Button>
    </form>
  );
};

export default AddRoom;
