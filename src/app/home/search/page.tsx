import { FC } from "react";
import NavBar from "@/components/NavBar";
import SearchForm from "./components/SearchForm";
import FriendCard from "@/components/FriendCard";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20">
          <SearchForm />

          <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex justify-center sm:justify-start gap-8 flex-wrap">
            {Array(1)
              .fill(0)
              .map((val, idx) => {
                return (
                  <FriendCard
                    key={idx}
                    name="erlan erlangga"
                    isSearch={true}
                    image=""
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
