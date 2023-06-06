import { FC } from "react";
import NavBar from "@/components/NavBar";
import Header from "./../components/Header";
import MiniNav from "./../components/MiniNav";
import PhotoCard from "./components/PhotoCard";
import { cookies } from "next/headers";
import { UserType, Image_PostType } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";

const getAllImage = async ({
  tokenString,
  user_id,
}: {
  tokenString: string;
  user_id: string;
}) => {
  const res = await axios.get(`${env.url_api}/getAllImage/${user_id}`, {
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

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;
  const imageData = (await getAllImage({
    tokenString,
    user_id: userData.user_id,
  })) as Image_PostType[];

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header userData={userData} tokenString={tokenString} />
        <MiniNav current="photo" />

        <div className="rounded-lg py-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-5 flex-wrap">
          {imageData.map((val, idx) => {
            return (
              <PhotoCard
                key={idx}
                image={val.image}
                image_id={val.image_post_id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
