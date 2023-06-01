"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const EditRoomName: FC = () => {
  const [roomName, setRoomName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    console.log(roomName);
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
