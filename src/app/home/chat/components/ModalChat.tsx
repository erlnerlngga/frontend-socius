"use client";

import { FC, ReactNode, useState } from "react";
import ModalChildChat from "./ModalChildChat";
import { UserType, RoomTypeRes } from "@/utils/types";

interface contentType {
  tokenString: string;
  userData: UserType;
  roomData?: RoomTypeRes[];
}

interface PropType {
  children: ReactNode;
  content: FC<contentType>;
  tokenString: string;
  userData: UserType;
  roomData?: RoomTypeRes[];
}

const ModalChat: FC<PropType> = ({
  children,
  content,
  tokenString,
  userData,
  roomData,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      {open && (
        <ModalChildChat
          close={handleClose}
          content={content}
          tokenString={tokenString}
          userData={userData}
          roomData={roomData}
        />
      )}
    </>
  );
};

export default ModalChat;
