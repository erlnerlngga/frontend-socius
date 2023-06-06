import { FC } from "react";
import NavBar from "@/components/NavBar";
import Header from "./../components/Header";
import MiniNav from "./../components/MiniNav";
import Friends from "./components/Friends";
import { cookies } from "next/headers";
import env from "@/utils/constant";
import axios from "axios";
import { UserFriendType, UserType } from "@/utils/types";

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

  return res.data;
};

export default async function Page() {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  console.log(tokenString);
  console.log(userDataString);

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;

  const friendData = (await getAllFriend({
    user_id: userData.user_id,
    tokenString,
  })) as UserFriendType[];

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header userData={userData} tokenString={tokenString} />
        <MiniNav current="friends" />

        <Friends
          friendData={friendData}
          userData={userData}
          tokenString={tokenString}
        />
      </div>
    </section>
  );
}
