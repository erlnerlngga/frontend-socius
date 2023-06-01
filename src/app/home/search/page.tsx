import { FC } from "react";
import NavBar from "@/components/NavBar";
import SearchForm from "./components/SearchForm";
import Friends from "./components/Friends";

const Page: FC = () => {
  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20">
          <SearchForm />
          <Friends />
        </div>
      </div>
    </section>
  );
};

export default Page;
