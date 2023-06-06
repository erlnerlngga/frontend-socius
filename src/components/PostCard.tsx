"use client";

import { FC, useState } from "react";
import Image from "next/image";
import userImage from "../../public/user.png";
import { IoChatboxEllipses } from "react-icons/io5";
import Comment from "./Comment";
import Modal from "./Modal";
import LinkCustom from "./LinkCustom";
import { Image_PostType, UserType, GetPostType } from "@/utils/types";

interface PropType {
  userData: UserType;
  postData: GetPostType
  tokenString: string;
}

const PostCard: FC<PropType> = ({
  userData,
  postData,
  tokenString,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((curr) => !curr);
  };

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto flex flex-col gap-4">
      <div className="flex gap-4 items-center px-4">
        <div className="relative w-10 h-10 lg:w-16 lg:h-16">
          <Image
            src={postData.photo_profile || userImage}
            alt={`${postData.user_name} photo`}
            fill
            className="rounded-full"
          />
        </div>

        <p className={`text-gray-300 tracking-wider`}>{postData.user_name}</p>
      </div>

      {/* <hr className="border-2 border-indigo-900 mb-8" /> */}

      <div className="px-4">
        <p className="text-gray-300 tracking-wider leading-relaxed mb-6">
          {postData.content}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {postData.images &&
            postData.images.map((val, idx) => {
              return (
                <Modal key={idx} image={val.image}>
                  <div className="relative h-40 sm:h-64 md:h-72">
                    <Image
                      src={val.image}
                      fill
                      alt={`${val.image_post_id}`}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </Modal>
              );
            })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-6 ml-4 mb-8">
          <IoChatboxEllipses
            onClick={handleOpen}
            className="text-indigo-500 h-5 w-5 cursor-pointer"
          />

          <LinkCustom
            href={`/home/comment/${postData.post_id}`}
            className="text-indigo-500 font-semibold"
          >
            {postData.number_of_comment} comments
          </LinkCustom>
        </div>
        {open && (
          <Comment
            tokenString={tokenString}
            userData={userData}
            postData={postData}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
