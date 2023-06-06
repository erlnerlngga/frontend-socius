"use client";

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import userImage from "../../../../../public/user.png";
import Image, { StaticImageData } from "next/image";
import convertToBase64 from "@/utils/convert";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import { SignUpValidation } from "@/utils/validate";
import { SignUpType, UserType } from "@/utils/types";
import Button from "@/components/Button";
import { Toaster } from "react-hot-toast";
import env from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const updateProfile = async ({
  user_id,
  user_name,
  email,
  photo_profile,
  tokenString,
  route,
}: {
  user_id: string;
  user_name: string;
  email: string;
  photo_profile: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const res = await axios.put(
    `${env.url_api}/updateUser`,
    {
      user_id,
      user_name,
      email,
      photo_profile,
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

  route.push("/home");
};

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const uploadImage = async ({
  user_id,
  user_name,
  email,
  tokenString,
  route,
  file,
}: {
  file: FileList;
  user_id: string;
  user_name: string;
  email: string;
  tokenString: string;
  route: AppRouterInstance;
}) => {
  const formData = new FormData();

  formData.append("file", file[0]);
  formData.append("upload_preset", "socius");

  const data = await fetch(env.url_image, {
    method: "POST",
    body: formData,
  });

  const dataImage = await data.json();

  await delay(500);

  const update = await updateProfile({
    user_id,
    user_name,
    email,
    tokenString,
    route,
    photo_profile: dataImage.secure_url,
  });

  return update;
};

interface PropType {
  userData: UserType;
  tokenString: string;
}

const Header: FC<PropType> = ({ userData, tokenString }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filePicker = useRef<HTMLInputElement>(null);
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: updateProfile,
  });

  const mutationUpload = useMutation({
    mutationFn: uploadImage,
  });

  const [imageSrc, setImageSrc] = useState<{
    file: FileList | null;
    img: string | StaticImageData;
  }>({
    file: null,
    img: userData.photo_profile || userImage,
  });

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = (await convertToBase64(e.target.files[0])) as string;
      setImageSrc({ file: e.target.files, img });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userData.user_name,
      email: userData.email,
    },
    validate: SignUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: SignUpType) => {
      setIsLoading((cur) => !cur);
      values = await Object.assign(values, { image: imageSrc.file });

      if (values.email === undefined || values.name === undefined)
        throw new Error("data is empty");

      if (values.image !== null && values.image !== undefined) {
        mutationUpload.mutate({
          user_id: userData.user_id,
          user_name: `${values.name}`,
          email: `${values.email}`,
          file: values.image,
          tokenString: tokenString,
          route,
        });
      }

      if (imageSrc.file === null) {
        mutation.mutate({
          user_id: userData.user_id,
          user_name: values.name,
          email: values.email,
          photo_profile: userData.photo_profile,
          tokenString: tokenString,
          route,
        });
      }
    },
  });

  const handleCancel = () => {
    formik.values.name = userData.user_name;
    formik.values.email = userData.email;
    setImageSrc({
      file: null,
      img: userData.photo_profile || userImage,
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
              <Button
                buttonType="submit"
                style={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading ? <LoadingButton /> : "save"}
              </Button>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Header;
