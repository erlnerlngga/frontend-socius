import { FC } from "react";
import NavBar from "@/components/NavBar";
import SearchForm from "./components/SearchForm";
import Friends from "./components/Friends";
import { cookies } from "next/headers";
import { UserType } from "@/utils/types";

interface PropType {
  searchParams: { email: string };
}

export default function Page({ searchParams }: PropType) {
  const cookieStore = cookies();
  const tokenString = cookieStore.get("token-user")?.value;
  const userDataString = cookieStore.get("user-data")?.value;

  if (!tokenString || !userDataString) throw new Error("token is not found");

  const userData = JSON.parse(userDataString) as UserType;

  return (
    <section className="flex flex-col sm:flex-row">
      <NavBar userData={userData} tokenString={tokenString} />
      <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20 ">
        <div className="sm:grow px-4 sm:px-8 py-16 flex flex-col gap-20">
          <SearchForm />
          {searchParams.email && (
            <Friends
              searchParams={searchParams}
              tokenString={tokenString}
              userData={userData}
            />
          )}
        </div>
      </div>
    </section>
  );
}
