"use client";

import { FC, useState } from "react";
import Image from "next/image";
import userImage from "../../../../../public/user.png";
import { IoChatboxEllipses } from "react-icons/io5";
import Comment from "@/components/Comment";
import Modal from "@/components/Modal";
import { GetPostType, UserType } from "@/utils/types";

interface PropType {
  tokenString: string;
  post_data: GetPostType;
  userData: UserType;
}

const CommentDetail: FC<PropType> = ({ tokenString, post_data, userData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((curr) => !curr);
  };

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-2/3 lg:mx-auto flex flex-col gap-4">
      <div className="flex gap-4 items-center px-4">
        <div className="relative w-10 h-10 lg:w-16 lg:h-16">
          <Image
            src={post_data.photo_profile || userImage}
            alt="user image"
            fill
            className="rounded-full"
          />
        </div>

        <p className={`text-gray-300 tracking-wider`}>{post_data.user_name}</p>
      </div>

      {/* <hr className="border-2 border-indigo-900 mb-8" /> */}

      <div className="px-4">
        <p className="text-gray-300 tracking-wider leading-relaxed mb-6">
          {post_data.content}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {post_data.images &&
            post_data.images.map((val, idx) => {
              return (
                <Modal key={idx} image={val.image}>
                  <div className="relative h-40 sm:h-64 md:h-72">
                    <Image
                      src={val.image}
                      fill
                      alt={`${val.post_id} photo`}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </Modal>
              );
            })}
        </div>
      </div>

      <div>
        <IoChatboxEllipses
          onClick={handleOpen}
          className="text-indigo-500 h-5 w-5 cursor-pointer ml-4 mb-8"
        />
        {open && (
          <Comment
            tokenString={tokenString}
            userData={userData}
            postData={post_data}
          />
        )}
      </div>

      <hr className="border-2 border-indigo-900 mt-8" />
    </div>
  );
};

export default CommentDetail;
