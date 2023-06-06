import { FC } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "../components/SideBar";
import ChatBody from "../components/ChatBody";
import { cookies } from "next/headers";
import { UserType, RoomTypeRes, MessageType } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";

const getAllMsg = async ({
  room_id,
  tokenString,
}: {
  room_id: string;
  tokenString: string;
}) => {
  const res = await axios.get(`${env.url_api}/ws/getAllMessage/${room_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth data");

  return res.data as MessageType[];
};

const getAllRooms = async ({
  user_id,
  tokenString,
}: {
  user_id: string;
  tokenString: string;
}) => {
  const res = await axios.get(`${env.url_api}/ws/getRoomsByUser/${user_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth");

  return res.data as RoomTypeRes[];
};

export default async function Page({ params }: { params: { roomId: string } }) {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;

  const roomDat = getAllRooms({
    user_id: userData.user_id,
    tokenString,
  });

  const msgDat = getAllMsg({ room_id: params.roomId, tokenString });

  const [roomData, msgData] = await Promise.all([roomDat, msgDat]);

  const room = roomData.filter((val) => params.roomId === val.room_id)[0];

  const msgs = msgData.map((val) => {
    val.user_id === userData.user_id
      ? (val.type = "self")
      : (val.type = "recv");

    return val;
  });

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 pt-10 pb-36 flex flex-row gap-20">
        <ChatBody
          userData={userData}
          roomData={room}
          tokenString={tokenString}
          roomId={params.roomId}
          msgs={msgs}
        />
        <SideBar
          isHome={false}
          roomData={roomData}
          tokenString={tokenString}
          userData={userData}
        />
      </div>
    </section>
  );
}
