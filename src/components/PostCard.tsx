"use client";

import { FC, useState } from "react";
import Image from "next/image";
import userImage from "../../public/user.png";
import { IoChatboxEllipses } from "react-icons/io5";
import Comment from "./Comment";
import Modal from "./Modal";
import Link from "next/link";

interface PropType {
  post_id: string;
  user_name: string;
  photo_profile: string;
  post_content: string;
  post_images?: string[];
  params: { params: { postId: string } };
}

const PostCard: FC<PropType> = ({
  post_id,
  user_name,
  photo_profile,
  post_content,
  post_images,
  params,
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
            src={userImage}
            alt="user image"
            fill
            className="rounded-full"
          />
        </div>

        <p className={`text-gray-300 tracking-wider`}>erlan erlangga</p>
      </div>

      {/* <hr className="border-2 border-indigo-900 mb-8" /> */}

      <div className="px-4">
        <p className="text-gray-300 tracking-wider leading-relaxed mb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          laboriosam quo vitae in ipsum ea explicabo quas dolorem maxime
          dignissimos!
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Modal image="https://images.unsplash.com/photo-1627853585634-7cbfadc6b974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80">
            <div className="relative h-40 sm:h-64 md:h-72">
              <Image
                src={
                  "https://images.unsplash.com/photo-1627853585634-7cbfadc6b974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80"
                }
                fill
                alt="Phot"
                className="rounded-lg object-cover"
              />
            </div>
          </Modal>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-6 ml-4 mb-8">
          <IoChatboxEllipses
            onClick={handleOpen}
            className="text-indigo-500 h-5 w-5 cursor-pointer"
          />

          <Link
            href={"/home/comment/1"}
            className="text-indigo-500 font-semibold"
          >
            {2} comments
          </Link>
        </div>
        {open && <Comment />}
      </div>
    </div>
  );
};

export default PostCard;
