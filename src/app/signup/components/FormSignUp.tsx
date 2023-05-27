"use client";

import { FC, FormEvent } from "react";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignUpType } from "@/utils/types";
import { SignUpValidation } from "@/utils/validate";
import Input from "@/components/Input";
import Button from "@/components/Button";

const FormSignUp: FC = () => {
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: SignUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: SignUpType) => {
      console.log(values);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="name" className="text-gray-400">
            Name
          </label>
          <Input
            id="name"
            name="name"
            onChange={formik.handleChange}
            inputType="text"
          />
        </div>

        <div className="flex flex-col mb-8">
          <label htmlFor="email" className="text-gray-400">
            Email
          </label>
          <Input
            id="email"
            name="email"
            inputType="email"
            onChange={formik.handleChange}
          />
        </div>

        <Button buttonType="submit">Sign up</Button>

        <div className="flex items-center gap-1 justify-center mt-2.5">
          <p className="text-gray-400">Already have a account?</p>
          <p
            className="text-indigo-400 transition hover:text-indigo-300 cursor-pointer"
            onClick={() => route.push("/signin")}
          >
            Sign in
          </p>
        </div>
      </form>
    </>
  );
};

export default FormSignUp;
