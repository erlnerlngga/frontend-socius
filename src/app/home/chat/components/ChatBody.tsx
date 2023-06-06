"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import InputMessage from "./InputMessage";
import { FaUserPlus } from "react-icons/fa";
import ModalChat from "./ModalChat";
import AddFriend from "./AddFriend";
import { UserType, RoomTypeRes, MessageType } from "@/utils/types";
import ChatCard from "./ChatCard";
import { useRouter } from "next/navigation";
import env from "@/utils/constant";
import { useWS } from "@/utils/websocket_provider";

interface PropType {
  userData: UserType;
  roomData: RoomTypeRes;
  roomId: string;
  tokenString: string;
  msgs: MessageType[];
}

const ChatBody: FC<PropType> = ({ userData, msgs }) => {
  const route = useRouter();
  const { conn } = useWS();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<MessageType>>(msgs);

  const [msg, setMsg] = useState("");
  const handleMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (conn === null) {
      route.push("/home/chat");
      return;
    }

    conn.onmessage = (message) => {
      const m: MessageType = JSON.parse(message.data);

      m.user_id === userData.user_id ? (m.type = "self") : (m.type = "recv");
      setMessages((prevMessages) => [...prevMessages, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [messages, conn, userData.user_name, route]);

  const sendMessage = () => {
    if (conn === null) {
      route.push("/home/chat");
      return;
    }

    conn.send(msg);
    setMsg("");
  };

  return (
    <section className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 sm:ml-6 flex flex-col gap-20  shadow-lg">
      <>
        <ChatCard message={messages} />
        <div ref={bottomRef} />
      </>

      <InputMessage msg={msg} handleMsg={handleMsg} handleSend={sendMessage} />
    </section>
  );
};

export default ChatBody;
