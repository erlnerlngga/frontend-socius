import NavBar from "@/components/NavBar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { cookies } from "next/headers";
import env from "@/utils/constant";
import { GetPostType, UserType } from "@/utils/types";

const getAllPost = async ({
  tokenString,
  user_id,
}: {
  tokenString: string;
  user_id: string;
}) => {
  const res = await axios.get(`${env.url_api}/getAllPost/${user_id}`, {
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

  const data = (await getAllPost({
    tokenString,
    user_id: userData.user_id,
  })) as GetPostType[];

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <CreatePost
          tokenString={tokenString}
          user_id={userData.user_id}
          photo_profile={userData.photo_profile}
        />

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
