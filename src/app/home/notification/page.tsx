import { FC } from "react";
import NavBar from "@/components/NavBar";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <h1 className="text-2xl text-teal-700">Notification</h1>
      </div>
    </section>
  );
};

export default Page;
