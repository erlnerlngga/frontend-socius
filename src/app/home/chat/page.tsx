import NavBar from "@/components/NavBar";
import SideBar from "./components/SideBar";
import ModalChat from "./components/ModalChat";
import AddRoom from "./components/AddRoom";
import { cookies } from "next/headers";
import { UserType, RoomTypeRes } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";
import AddFriend from "./components/AddFriend";
import { FaUserPlus } from "react-icons/fa";

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

  return res.data;
};

export default async function Page() {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;

  const roomData = (await getAllRooms({
    user_id: userData.user_id,
    tokenString,
  })) as RoomTypeRes[];

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="relative sm:grow px-4 sm:px-8 pt-10 pb-20 flex flex-row gap-20">
        <div className="w-full mt-96 sm:mt-0 grid place-items-center">
          <div className="flex flex-col gap-8 ">
            <ModalChat
              content={AddRoom}
              tokenString={tokenString}
              userData={userData}
            >
              <h1 className="text-indigo-500 text-center text-2xl font-semibold tracking-wider 2xl:-translate-x-1/2">
                Click here to create room
              </h1>
            </ModalChat>

            <h1 className="text-indigo-500 text-center text-xl font-semibold tracking-wider 2xl:-translate-x-1/2">
              or
            </h1>

            <ModalChat
              content={AddFriend}
              tokenString={tokenString}
              userData={userData}
              roomData={roomData}
            >
              <h1 className="text-indigo-500 text-center text-xl font-semibold tracking-wider 2xl:-translate-x-1/2">
                Add friend to chat room
              </h1>
            </ModalChat>
          </div>
        </div>

        <SideBar
          isHome={true}
          roomData={roomData}
          tokenString={tokenString}
          userData={userData}
        />
      </div>
    </section>
  );
}
