import { FC } from "react";
import Image from "next/image";
import socius from "../../../public/socius.svg";
import FormSignIn from "./component/FormSignIn";

const Page: FC = () => {
  return (
    <section className="px-0 pt-14">
      <div className="container h-[800px] mx-auto py-0 px-10 xl:px-48 grid grid-cols-1 xl:grid-cols-2 items-center justify-items-center lg:gap-40">
        <div className="relative w-full lg:w-1/2 xl:w-full h-full xl:h-[300px] mt-20 xl:mt-0">
          <Image src={socius} fill alt="socius logo" />
        </div>

        <div className="w-full lg:w-1/2 xl:w-2/3 -mt-20 xl:mt-0">
          <FormSignIn />
        </div>
      </div>
    </section>
  );
};

export default Page;
