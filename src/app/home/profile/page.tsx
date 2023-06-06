import NavBar from "@/components/NavBar";
import Header from "./components/Header";
import MiniNav from "./components/MiniNav";
import PostCard from "@/components/PostCard";
import { cookies } from "next/headers";
import env from "@/utils/constant";
import { UserType, GetPostType } from "@/utils/types";
import axios from "axios";

const getAllOwnPost = async ({
  tokenString,
  user_id,
}: {
  tokenString: string;
  user_id: string;
}) => {
  const res = await axios.get(`${env.url_api}/getAllOwnPost/${user_id}`, {
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

  const data = (await getAllOwnPost({
    tokenString,
    user_id: userData.user_id,
  })) as GetPostType[];

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header userData={userData} tokenString={tokenString} />
        <MiniNav current="timeline" />

        <>
          {data.map((val, idx) => {
            return (
              <PostCard
                key={idx}
                userData={userData}
                postData={val}
                tokenString={tokenString}
              />
            );
          })}
        </>
      </div>
    </section>
  );
}
