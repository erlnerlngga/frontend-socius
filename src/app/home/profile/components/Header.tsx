"use client";

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import userImage from "../../../../../public/user.png";
import Image, { StaticImageData } from "next/image";
import convertToBase64 from "@/utils/convert";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import { SignUpValidation } from "@/utils/validate";
import { SignUpType } from "@/utils/types";
import Button from "@/components/Button";
import { Toaster } from "react-hot-toast";

interface PropType {
  name: string;
  email: string;
  image: string;
}

const Header: FC<PropType> = ({ name, email, image }) => {
  const [isEdit, setIsEdit] = useState(false);
  const filePicker = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<{
    file: object;
    img: string | StaticImageData;
  }>({
    file: {},
    img: image || userImage,
  });

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = (await convertToBase64(e.target.files[0])) as string;
      setImageSrc({ file: e.target.files[0], img });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
    },
    validate: SignUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: SignUpType) => {
      values = await Object.assign(values, { image: imageSrc.file });
      console.log(values);
    },
  });

  const handleCancel = () => {
    formik.values.name = name;
    formik.values.email = email;
    setImageSrc({
      file: {},
      img: image || userImage,
    });
    setIsEdit(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="relative rounded-lg p-4 w-full lg:w-3/4 2xl:w-1/2 lg:mx-auto">
        <FaEdit
          onClick={() => setIsEdit(true)}
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-indigo-500"
        />
        <form className="sm:p-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 mb-8">
            <div className="">
              <div
                onClick={() => filePicker.current?.click()}
                className="relative h-28 w-28 md:h-36 md:w-36"
              >
                <Image
                  src={imageSrc.img}
                  fill
                  alt="photo profle"
                  className="rounded-full object-cover"
                />
              </div>

              <input
                disabled={!isEdit}
                type="file"
                onChange={handleImage}
                ref={filePicker}
                name="file"
                className="hidden"
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                className={`outline-none text-base sm:text-lg md:text-xl font-bold tracking-widest py-1.5 px-4 bg-neutral-800 text-gray-300 rounded-lg border-2 ${
                  isEdit ? `border-indigo-500 mb-0` : `border-neutral-800 -mb-4`
                }`}
                disabled={!isEdit}
                onChange={formik.handleChange}
              />

              <input
                type="email"
                name="email"
                value={formik.values.email}
                className={`outline-none text-base sm:text-lg md:text-xl font-bold tracking-widest py-1.5 px-4 bg-neutral-800 text-gray-300 rounded-lg border-2 ${
                  isEdit ? `border-indigo-500` : `border-neutral-800`
                }`}
                disabled={!isEdit}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {isEdit && (
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCancel}
                buttonType="button"
                style="bg-red-400"
              >
                cancel
              </Button>
              <Button buttonType="submit">save</Button>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Header;
