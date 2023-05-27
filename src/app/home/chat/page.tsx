import { FC } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "./components/SideBar";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-row gap-20 ">
        <div className="bg-slate-100">
          <h1 className="text-2xl text-teal-700">TEST</h1>
        </div>
        <SideBar />
      </div>
    </section>
  );
};

export default Page;
