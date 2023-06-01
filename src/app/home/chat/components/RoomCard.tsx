"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import EditRoomName from "./EditRoomName";

const RoomCard: FC = () => {
  const [openChange, setOpenChange] = useState(false);

  const handleOpenAddChange = () => {
    setOpenChange((cur) => !cur);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4 bg-slate-700 px-6 py-2 rounded-full">
        <Link
          href={"/home/chat/1"}
          className={`text-sm text-gray-300 tracking-wider transition hover:text-indigo-300`}
        >
          12345678901234567890
        </Link>

        <span className="text-gray-300 text-xs bg-indigo-500 py-0.5 px-2 rounded-full">
          {29}
        </span>

        <div className="flex items-center gap-2">
          <FaEdit
            onClick={handleOpenAddChange}
            className="cursor-pointer text-indigo-400 w-4 h-4 transition hover:text-opacity-80"
          />
          <FaTrashAlt className="cursor-pointer text-indigo-400 w-4 h-4 transition hover:text-red-400" />
        </div>
      </div>

      {openChange && <EditRoomName />}
    </div>
  );
};

export default RoomCard;
