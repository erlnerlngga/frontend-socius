"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import socius from "../../public/socius.svg";
import userImage from "../../public/user.png";
import {
  FaBell,
  FaHome,
  FaEnvelope,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt,
  FaBars,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FC, useState } from "react";
import { UserType } from "@/utils/types";
import axios from "axios";
import env from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import LinkCustom from "./LinkCustom";

const getCountNotification = async ({
  user_id,
  tokenString,
}: {
  user_id: string;
  tokenString: string;
}) => {
  const res = await axios.get(
    `${env.url_api}/getCountNotification/${user_id}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to fetch");

  return res.data;
};

const getCountMessage = async ({
  user_id,
  tokenString,
}: {
  user_id: string;
  tokenString: string;
}) => {
  const res = await axios.get(
    `${env.url_api}/ws/getAllUnreadMessage/${user_id}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to fetch");

  return res.data;
};

interface PropType {
  userData: UserType;
  tokenString: string;
}

const NavBar: FC<PropType> = ({ userData, tokenString }) => {
  const pathname = usePathname();
  const path = pathname.split("/").slice(-1)[0];

  const getNotif = useQuery({
    queryKey: ["getCountNotif"],
    queryFn: () =>
      getCountNotification({ user_id: userData.user_id, tokenString }),
  });

  const getMsg = useQuery({
    queryKey: ["getCountMsg"],
    queryFn: () => getCountMessage({ user_id: userData.user_id, tokenString }),
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  return (
    <>
      <div className={`sm:hidden flex items-center justify-between p-6`}>
        <div className="sm:hidden lg:block relative w-36 h-12 self-center">
          <Image src={socius} alt="logo socius" fill />
        </div>
        <FaBars
          onClick={handleOpen}
          className={`${
            !open ? `block` : `hidden`
          } w-6 h-6 text-indigo-500 sm:hidden self-center cursor-pointer`}
        />
      </div>

      <section
        className={`fixed ${
          open ? `translate-x-0` : `-translate-x-full`
        } sm:translate-x-0 sm:sticky sm:top-0 bg-neutral-800  lg:grow-0 h-screen sm:w-16 lg:w-80 px-2 lg:px-8 py-6 flex flex-col justify-between  z-10   transition`}
      >
        <IoClose
          onClick={handleOpen}
          className={`sm:hidden h-6 w-6 text-indigo-500 absolute top-2 right-2 cursor-pointer`}
        />

        <div
          className={`sm:${
            open ? `block` : `hidden`
          } lg:block relative w-36 h-12 self-center`}
        >
          <Image src={socius} alt="logo socius" fill />
        </div>

        <div className="flex flex-col gap-6">
          <LinkCustom
            href={"/home"}
            className={`flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full shadow ${
              path === "home" && "bg-slate-700"
            }`}
          >
            <FaHome className="w-6 h-6 text-indigo-500" />
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Home
            </p>
          </LinkCustom>

          <LinkCustom
            href={"/home/chat"}
            className={`flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full shadow ${
              path === "chat" && "bg-slate-700"
            }`}
          >
            <div className="relative">
              <FaEnvelope className="w-6 h-6 text-indigo-500" />
              {getMsg.isSuccess && getMsg.data.unread_message > 0 && (
                <span className="absolute -top-3 text-xs -right-3 w-5 h-5 text-gray-300 bg-red-700 grid place-items-center rounded-full">
                  {getMsg.isSuccess && getMsg.data.unread_message}
                </span>
              )}
            </div>
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Chat
            </p>
          </LinkCustom>

          <LinkCustom
            href={"/home/search"}
            className={`flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full  shadow ${
              path === "search" && "bg-slate-700"
            }`}
          >
            <FaSearch className="w-6 h-6 text-indigo-500" />
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Search Friends
            </p>
          </LinkCustom>

          <LinkCustom
            href={"/home/notification"}
            className={`flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full  shadow ${
              path === "notification" && "bg-slate-700"
            }`}
          >
            <div className="relative">
              <FaBell className="w-6 h-6 text-indigo-500" />
              {getNotif.isSuccess && getNotif.data.number > 0 && (
                <span className="absolute -top-3 text-xs -right-2 w-5 h-5 text-gray-300 bg-red-700 grid place-items-center rounded-full">
                  {getNotif.isSuccess && getNotif.data.number}
                </span>
              )}
            </div>
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Notifications
            </p>
          </LinkCustom>

          <LinkCustom
            href={"/home/profile"}
            className={`flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full  shadow ${
              (path === "profile" || path === "friend" || path === "photo") &&
              "bg-slate-700"
            }`}
          >
            <FaUserAlt className="w-6 h-6 text-indigo-500" />
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Profile
            </p>
          </LinkCustom>

          <LinkCustom
            href={"/signout"}
            className="flex items-center gap-6 px-6 py-4 sm:py-2 sm:px-2.5 lg:px-6 lg:py-4 rounded-full  shadow"
          >
            <FaSignOutAlt className="w-6 h-6 text-indigo-500" />
            <p
              className={`sm:hidden lg:block text-gray-300 font-medium text-lg tracking-wider`}
            >
              Sign out
            </p>
          </LinkCustom>
        </div>

        <div className="flex items-center gap-4 self-center">
          <div className="relative w-10 h-10 lg:w-16 lg:h-16">
            <Image
              src={userData.photo_profile || userImage}
              alt="user image"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className={`sm:hidden lg:block text-gray-300 tracking-wider`}>
            {userData.user_name}
          </p>
        </div>
      </section>
    </>
  );
};

export default NavBar;
