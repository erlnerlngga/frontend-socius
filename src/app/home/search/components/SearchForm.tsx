"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import env from "@/utils/constant";

const SearchForm: FC = () => {
  const [email, setEmail] = useState("");
  const route = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    route.push(`${env.url_this}/home/search?email=${email}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          inputType="email"
          placeholder="Search by email"
          value={email}
          onChange={handleChange}
          id="email"
          name="email"
          style="basis-2/3"
        />
        <Button buttonType="submit" style="basis-1/3">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
