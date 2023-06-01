"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import userImage from "../../../../../public/user.png";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { ChangeEvent, FC, useState } from "react";
import Button from "@/components/Button";
import ModalChat from "./ModalChat";
import EditRoomName from "./EditRoomName";
import { IoClose, IoChatboxEllipses } from "react-icons/io5";
import RoomCard from "./RoomCard";

interface PropType {
  isHome: boolean;
}

const SideBar: FC<PropType> = ({ isHome }) => {
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
    <>
      <div className={`2xl:hidden fixed top-22 right-4`} onClick={handleOpen}>
        <IoChatboxEllipses className="h-8 w-8 text-indigo-500 cursor-pointer shadow-lg" />
      </div>

      <section
        className={`fixed  ${
          open ? `translate-x-0` : `translate-x-full`
        } 2xl:translate-x-0 top-0 right-0 bg-neutral-800 w-full h-screen sm:w-[400px] px-2 lg:px-4 py-12 flex flex-col gap-12 z-10 shadow-x transition`}
      >
        <IoClose
          onClick={handleOpen}
          className={`2xl:hidden h-6 w-6 text-indigo-500 absolute top-2 right-2 cursor-pointer`}
        />

        <h1 className="text-2xl text-indigo-500 tracking-wider font-semibold mt-6 px-4">
          Chat rooms
        </h1>

        <div className="sidebar flex flex-col gap-6 overflow-y-scroll px-2 sm:px-2">
          <>
            {Array(5)
              .fill(0)
              .map((val, idx) => {
                return <RoomCard key={idx} />;
              })}
          </>
        </div>
      </section>
    </>
  );
};

export default SideBar;
