"use client";

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { IoImage, IoClose } from "react-icons/io5";
import { HiFaceSmile } from "react-icons/hi2";
import Button from "./Button";
import convertToBase64 from "@/utils/convert";
import { useMutation } from "@tanstack/react-query";
import env from "@/utils/constant";
import axios from "axios";
import { GetPostType, UserType } from "@/utils/types";

const createNotif = async ({
  issuer,
  issuer_name,
  notifier,
  notifier_name,
  status,
  accept,
  post_id,
  type,
  tokenString,
}: {
  issuer: string;
  issuer_name: string;
  notifier: string;
  notifier_name: string;
  status: string;
  accept: string;
  post_id: string;
  type: string;
  tokenString: string;
}) => {
  const res = await axios.post(
    `${env.url_api}/createNotification`,
    {
      issuer,
      issuer_name,
      notifier,
      notifier_name,
      status,
      accept,
      post_id,
      type,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post data");

  return res.data;
};

const createComment = async ({
  post_id,
  user_id,
  content,
  images,
  tokenString,
}: {
  post_id: string;
  user_id: string;
  content: string;
  images: string[];
  tokenString: string;
}) => {
  const res = await axios.post(
    `${env.url_api}/createComment`,
    {
      post_id,
      user_id,
      content,
      images,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenString}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("failed to post data");

  const resData = res.data;

  if (!(resData.status === "success")) throw new Error("something went wrong");

  return resData;
};

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const uploadImage = async ({
  post_id,
  user_id,
  content,
  imageSrc,
  tokenString,
}: {
  imageSrc: { id: number; file: FileList; img: string }[];
  post_id: string;
  user_id: string;
  content: string;
  tokenString: string;
}) => {
  const img_url = await Promise.all(
    imageSrc.map(async (val) => {
      const formData = new FormData();

      formData.append("file", val.file[0]);
      formData.append("upload_preset", "socius");

      const data = await fetch(env.url_image, {
        method: "POST",
        body: formData,
      });

      const imgData = await data.json();
      return imgData.secure_url;
    })
  );

  await delay(2000);
  // console.log("out upload", {
  //   user_id,
  //   content,
  //   images: img_url,
  //   tokenString,
  //   route,
  // });

  const comm = await createComment({
    post_id,
    user_id,
    content,
    images: img_url,
    tokenString,
  });

  return comm;
};

interface PropType {
  tokenString: string;
  postData: GetPostType;
  userData: UserType;
}

const Comment: FC<PropType> = ({ tokenString, postData, userData }) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);

  const mutation = useMutation({
    mutationFn: createComment,
  });

  const mutationUploadImage = useMutation({
    mutationFn: uploadImage,
  });

  const mutationNotif = useMutation({
    mutationFn: createNotif,
  });

  const [imageSrc, setImageSrc] = useState<
    { id: number; file: FileList; img: string }[]
  >([]);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && imageSrc.length <= 3) {
      // console.log(typeof e.target.files[0]);
      const img = (await convertToBase64(e.target.files[0])) as string;
      setImageSrc([
        ...imageSrc,
        { id: imageSrc.length, file: e.target.files, img },
      ]);
    }
  };

  const handleDeleteImage = (id: number) => {
    const newImg = imageSrc.filter((val) => val.id !== id);
    setImageSrc(newImg);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageSrc.length > 0 && content.current !== null) {
      mutationUploadImage.mutate({
        post_id: postData.post_id,
        user_id: userData.user_id,
        content: content.current.value,
        imageSrc,
        tokenString,
      });
      content.current.value = "";
      setImageSrc([]);
    }

    if (imageSrc.length === 0 && content.current !== null) {
      mutation.mutate({
        post_id: postData.post_id,
        user_id: userData.user_id,
        content: content.current.value,
        images: [],
        tokenString: tokenString,
      });
      content.current.value = "";
      setImageSrc([]);
    }

    if (userData.user_id !== postData.user_id) {
      mutationNotif.mutate({
        issuer: userData.user_id,
        issuer_name: userData.user_name,
        notifier: postData.user_id,
        notifier_name: postData.user_name,
        status: "not_read",
        accept: "none",
        post_id: postData.post_id,
        type: "comment",
        tokenString: tokenString,
      });
    }
  };

  return (
    <div className="rounded-lg p-4 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <div className="w-full">
            <textarea
              ref={content}
              rows={1}
              placeholder="Whats happening ..."
              className="resize outline-none px-4 py-1.5 border-2 border-indigo-500 tracking-wider bg-neutral-800 rounded-lg text-gray-300 w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <label onClick={() => filePicker.current?.click()}>
              <IoImage className="text-indigo-500 h-5 w-5 cursor-pointer" />
            </label>

            <input
              onChange={handleImage}
              ref={filePicker}
              type="file"
              name="file"
              className="hidden"
            />
          </div>
          <HiFaceSmile className="text-indigo-500 h-5 w-5 cursor-pointer" />
        </div>

        {imageSrc.length > 0 ? (
          <div className="flex flex-wrap gap-6 mt-4 ml-28 mb-4">
            {imageSrc.map((val) => {
              return (
                <div key={val.id} className="relative w-[90px] h-[90px]">
                  <IoClose
                    onClick={() => handleDeleteImage(val.id)}
                    className="cursor-pointer absolute -top-2 -right-2 w-4 h-4 text-indigo-800 bg-slate-300 rounded-full"
                  />
                  <Image
                    fill
                    alt={`image ${val.id}`}
                    src={val.img}
                    className="rounded-lg object-cover"
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <Button buttonType="submit" style="sm:w-1/4 self-end">
          Comment
        </Button>
      </form>
    </div>
  );
};

export default Comment;
