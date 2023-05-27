import NavBar from "@/components/NavBar";
import CreatePost from "@/components/CreatePost";
import { FC } from "react";
import PostCard from "@/components/PostCard";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <CreatePost />

        <>
          {Array(5)
            .fill(0)
            .map((val, idx) => {
              return <PostCard key={idx} />;
            })}
        </>
      </div>
    </section>
  );
};

export default Page;
