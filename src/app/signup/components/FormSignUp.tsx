"use client";

import { FC, FormEvent } from "react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignUpType } from "@/utils/types";
import { SignUpValidation } from "@/utils/validate";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import env from "@/utils/constant";
import LoadingButton from "@/components/LoadingButton";

const createAccount = ({ name, email }: { name: string; email: string }) => {
  return axios
    .post(
      `${env.url_api}/signup`,
      {
        user_name: name.toLowerCase(),
        email,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data);
};

const FormSignUp: FC = () => {
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: createAccount,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: SignUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: SignUpType) => {
      mutation.mutate({ name: `${values.name}`, email: `${values.email}` });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  if (mutation.isSuccess) {
    return (
      <p className="text-gray-300 tracking-widest leading-relaxed text-center">
        Check your email for sign in ... 😎
      </p>
    );
  }

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

        <Button
          buttonType="submit"
          style={`${
            mutation.isLoading ? `cursor-not-allowed` : `cursor-pointer`
          }`}
        >
          {mutation.isLoading ? <LoadingButton /> : "Sign up"}
        </Button>

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
