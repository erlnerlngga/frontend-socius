"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const SearchForm: FC = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto"
    >
      <div className="flex gap-4">
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
