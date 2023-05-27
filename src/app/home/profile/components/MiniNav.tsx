import { FC } from "react";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import Link from "next/link";

interface PropType {
  current: string;
}

const MiniNav: FC<PropType> = ({ current }) => {
  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto -mt-20">
      <div className="flex  justify-center gap-8 sm:gap-20">
        <Link
          href={"/home/profile"}
          className={`flex gap-2 items-center cursor-pointer pt-1.5 pb-3 ${
            current === "timeline" && `border-b-2 border-indigo-500`
          }`}
        >
          <FaUser className="text-indigo-500 w-4 h-4 sm:w-6 sm:h-6" />
          <p className="text-indigo-400 font-semibold tracking-wider text-sm sm:text-base">
            Timeline
          </p>
        </Link>

        <Link
          href={"/home/profile/friend"}
          className={`flex gap-2 items-center cursor-pointer pt-1.5 pb-3 ${
            current === "friends" && `border-b-2 border-indigo-500`
          }`}
        >
          <FaUserFriends className="text-indigo-500 w-4 h-4 sm:w-6 sm:h-6" />
          <p className="text-indigo-400 font-semibold tracking-wider text-sm sm:text-base">
            Friends
          </p>
        </Link>

        <Link
          href={"/home/profile/photo"}
          className={`flex gap-2 items-center cursor-pointer pt-1.5 pb-3 ${
            current === "photo" && `border-b-2 border-indigo-500`
          }`}
        >
          <HiPhoto className="text-indigo-500 w-4 h-4 sm:w-6 sm:h-6" />
          <p className="text-indigo-400 font-semibold tracking-wider text-sm sm:text-base">
            Photo
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MiniNav;
