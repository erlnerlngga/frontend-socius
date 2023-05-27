"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import userImage from "../../../../../public/user.png";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, FC, useState } from "react";
import Input from "@/components/Input";

const SideBar: FC = () => {
  const pathname = usePathname();
  const path = pathname.split("/").slice(-1)[0];

  const [open, setOpen] = useState(false);
  const [find, setFind] = useState<string>();

  const handleFind = (e: ChangeEvent<HTMLInputElement>) => {
    setFind(e.currentTarget.value);
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  return (
    <section
      className={`fixed top-0 right-0 bg-neutral-800  lg:grow-0 h-screen sm:w-16 lg:w-80 px-2 lg:px-8 py-12 flex flex-col gap-12 z-10 shadow-x transition`}
    >
      <Input
        id="search"
        name="search"
        value={find}
        onChange={handleFind}
        inputType="text"
        placeholder="search"
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 self-center bg-slate-700 px-4 py-2 rounded-full">
          <div className="relative w-10 h-10 lg:w-14 lg:h-14">
            <Image
              src={userImage}
              alt="user image"
              fill
              className="rounded-full"
            />
          </div>
          <p className={`sm:hidden lg:block text-gray-300 tracking-wider`}>
            erlan erlangga
          </p>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
