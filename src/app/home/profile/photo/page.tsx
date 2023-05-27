import { FC } from "react";
import NavBar from "@/components/NavBar";
import Header from "./../components/Header";
import MiniNav from "./../components/MiniNav";
import PhotoCard from "./components/PhotoCard";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <Header name="erlan erlangga" email="erlanerlangg@gmail.com" image="" />
        <MiniNav current="photo" />

        <div className="rounded-lg py-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-5 flex-wrap">
          {Array(5)
            .fill(0)
            .map((val, idx) => {
              return (
                <PhotoCard
                  key={idx}
                  image="https://images.unsplash.com/photo-1488048924544-c818a467dacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Page;
