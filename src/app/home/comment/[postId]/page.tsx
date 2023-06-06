import NavBar from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import CommentDetail from "../components/CommentDetail";
import { cookies } from "next/headers";
import { GetPostType, UserType } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";

const getAllComment = async ({
  tokenString,
  post_id,
}: {
  tokenString: string;
  post_id: string;
}) => {
  const res = await axios.get(`${env.url_api}/getAllComment/${post_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth data");

  return res.data as GetPostType[];
};

const getPost = async ({
  tokenString,
  post_id,
}: {
  tokenString: string;
  post_id: string;
}) => {
  const res = await axios.get(`${env.url_api}/getPost/${post_id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });

  if (res.status !== 200) throw new Error("failed to fecth");

  return res.data as GetPostType;
};

interface PropType {
  params: { postId: string };
}

export default async function Page({ params }: PropType) {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;

  const dataComment = getAllComment({
    tokenString,
    post_id: params.postId,
  });

  const dataPost = getPost({
    tokenString,
    post_id: params.postId,
  });

  const [commentData, postData] = await Promise.all([dataComment, dataPost]);

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <CommentDetail
          tokenString={tokenString}
          post_data={postData}
          userData={userData}
        />

        <>
          {commentData.map((val, idx) => {
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
