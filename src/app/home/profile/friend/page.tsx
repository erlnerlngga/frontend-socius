import { FC } from "react";
import NavBar from "@/components/NavBar";
import Header from "./../components/Header";
import MiniNav from "./../components/MiniNav";
import FriendCard from "@/components/FriendCard";
import Friends from "./components/Friends";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header name="erlan erlangga" email="erlanerlangg@gmail.com" image="" />
        <MiniNav current="friends" />

        <Friends />
      </div>
    </section>
  );
};

export default Page;
