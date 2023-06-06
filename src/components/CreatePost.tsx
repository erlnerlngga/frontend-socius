"use client";

import userImage from "../../public/user.png";
import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { IoImage, IoClose } from "react-icons/io5";
import { HiFaceSmile } from "react-icons/hi2";
import Button from "./Button";
import convertToBase64 from "@/utils/convert";
import env from "@/utils/constant";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import LoadingButton from "./LoadingButton";

const createPost = async ({
  user_id,
  content,
  images,
  tokenString,
  route,
}: {
  user_id: string;
  content: string;
  images: string[];
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.post(
    `${env.url_api}/createPost`,
    {
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

  route.refresh();
};

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const uploadImage = async ({
  user_id,
  content,
  tokenString,
  route,
  imageSrc,
}: {
  imageSrc: { id: number; file: FileList; img: string }[];
  user_id: string;
  content: string;
  tokenString: string;
  route: AppRouterInstance;
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
  const post = await createPost({
    user_id,
    content,
    images: img_url,
    tokenString,
    route,
  });
  return post;
};

interface PropType {
  tokenString: string;
  user_id: string;
  photo_profile: string;
}

const CreatePost: FC<PropType> = ({ tokenString, photo_profile, user_id }) => {
  const mutation = useMutation({
    mutationFn: createPost,
  });

  const mutationUploadImage = useMutation({
    mutationFn: uploadImage,
  });

  const [imageSrc, setImageSrc] = useState<
    { id: number; file: FileList; img: string }[]
  >([]);

  const content = useRef<HTMLTextAreaElement>(null);

  const route = useRouter();

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
        imageSrc,
        user_id,
        content: content.current.value,
        tokenString,
        route,
      });
      content.current.value = "";
      setImageSrc([]);
    }

    if (imageSrc.length === 0 && content.current !== null) {
      mutation.mutate({
        user_id,
        content: content.current.value,
        images: [],
        tokenString,
        route,
      });
      content.current.value = "";
    }
  };

  return (
    <div className="rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <div className="relative w-10 h-10 lg:w-24 lg:h-20">
            <Image
              src={photo_profile || userImage}
              alt="user photo"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="w-full">
            <textarea
              ref={content}
              rows={1}
              placeholder="Whats happening ..."
              className="resize outline-none px-4 py-1.5 border-2 border-indigo-500 tracking-wider bg-neutral-800 rounded-lg text-gray-300 w-full"
            />
          </div>
        </div>

        <div className="sm:px-28 flex gap-2 sm:items-center">
          <div>
            <label htmlFor="file">
              <IoImage className="text-indigo-500 h-5 w-5 cursor-pointer" />
            </label>

            <input
              onChange={handleImage}
              id="file"
              type="file"
              name="file"
              className="hidden"
            />
          </div>
          <HiFaceSmile className="text-indigo-500 h-5 w-5 cursor-pointer" />
        </div>

        {imageSrc.length > 0 ? (
          <div className="flex flex-wrap gap-6 mt-4 sm:ml-28 mb-4">
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

        <Button
          buttonType="submit"
          style={`sm:w-2/5 self-end ${
            mutation.isLoading || mutationUploadImage.isLoading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {mutation.isLoading || mutationUploadImage.isLoading ? (
            <LoadingButton />
          ) : (
            "Post"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
