import { FC } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "../components/SideBar";
import ChatBody from "../components/ChatBody";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 pt-10 pb-36 flex flex-row gap-20">
        <ChatBody />
        <SideBar isHome={false} />
      </div>
    </section>
  );
};

export default Page;
