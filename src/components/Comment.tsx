"use client";

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { IoImage, IoClose } from "react-icons/io5";
import { HiFaceSmile } from "react-icons/hi2";
import Button from "./Button";
import convertToBase64 from "@/utils/convert";

const Comment: FC = () => {
  const filePicker = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<
    { id: number; file: object; img: string }[]
  >([]);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && imageSrc.length <= 3) {
      // console.log(typeof e.target.files[0]);
      const img = (await convertToBase64(e.target.files[0])) as string;
      setImageSrc([
        ...imageSrc,
        { id: imageSrc.length, file: e.target.files[0], img },
      ]);
    }
  };

  const handleDeleteImage = (id: number) => {
    const newImg = imageSrc.filter((val) => val.id !== id);
    setImageSrc(newImg);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imageSrc);
  };

  return (
    <div className="rounded-lg p-4 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <div className="w-full">
            <textarea
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
