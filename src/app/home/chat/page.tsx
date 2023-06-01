import { FC } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "./components/SideBar";
import ModalChat from "./components/ModalChat";
import Button from "@/components/Button";
import AddRoom from "./components/AddRoom";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="relative sm:grow px-4 sm:px-8 pt-10 pb-20 flex flex-row gap-20">
        <div className="w-full mt-96 sm:mt-0 grid place-items-center">
          <ModalChat content={AddRoom}>
            <h1 className="text-indigo-500 text-2xl font-semibold tracking-wider 2xl:-translate-x-1/2">
              Click here to create room ...
            </h1>
          </ModalChat>
        </div>

        <SideBar isHome={true} />
      </div>
    </section>
  );
};

export default Page;
