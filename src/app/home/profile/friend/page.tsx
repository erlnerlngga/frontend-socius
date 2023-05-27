import { FC } from "react";
import NavBar from "@/components/NavBar";
import Header from "./../components/Header";
import MiniNav from "./../components/MiniNav";
import FriendCard from "@/components/FriendCard";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header name="erlan erlangga" email="erlanerlangg@gmail.com" image="" />
        <MiniNav current="friends" />

        <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-4 flex-wrap">
          {Array(5)
            .fill(0)
            .map((val, idx) => {
              return (
                <FriendCard
                  key={idx}
                  name="erlan erlangga"
                  isSearch={false}
                  image=""
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Page;
