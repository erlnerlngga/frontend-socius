import { FC } from "react";
import NavBar from "@/components/NavBar";
import AskFriend from "./components/AskFriend";
import CommentNotif from "./components/CommentNotif";
import { cookies } from "next/headers";
import env from "@/utils/constant";
import axios from "axios";
import { NotificationType } from "@/utils/types";

const getAllNotif = async (tokenString: string, userID: string) => {
  const res = await axios.get(`${env.url_api}/getAllNotification/${userID}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth data");

  return res.data;
};

const updateReadNotif = async ({
  user_id,
  tokenString,
}: {
  user_id: string;
  tokenString: string;
}) => {
  const res = await axios.put(
    `${env.url_api}/updateNotificationRead/${user_id}`,
    { user_id },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to fetch");

  return res.data;
};

export default async function Page() {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString);

  await updateReadNotif({
    user_id: userData.user_id,
    tokenString,
  });
  const notifData = (await getAllNotif(
    tokenString,
    userData.user_id
  )) as NotificationType[];

  // console.log(notifData);

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <h1 className="text-3xl font-bold tracking-wider text-indigo-500 p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto">
          Notification
        </h1>

        <div className="flex flex-col gap-6">
          {notifData.map((val, idx) => {
            if (val.type === "comment") {
              return (
                <CommentNotif
                  key={idx}
                  notifData={val}
                />
              );
            }

            return (
              <AskFriend
                key={idx}
                userData={userData}
                tokenString={tokenString}
                notifData={val}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
