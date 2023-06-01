import { FC } from "react";
import NavBar from "@/components/NavBar";
import AskFriend from "./components/AskFriend";
import CommentNotif from "./components/CommentNotif";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <h1 className="text-3xl font-bold tracking-wider text-indigo-500 p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto">
          Notification
        </h1>

        <div className="flex flex-col gap-6">
          <AskFriend />
          <CommentNotif />
        </div>
      </div>
    </section>
  );
};

export default Page;
