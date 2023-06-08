"use client";

import { FC, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { SignInType } from "@/utils/types";
import { SignInValidation } from "@/utils/validate";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import env from "@/utils/constant";
import LoadingButton from "@/components/LoadingButton";

const signInAccount = async ({ email }: { email: string }) => {
  return axios
    .post(
      `${env.url_api}/signin`,
      {
        email,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

const FormSignIn: FC = () => {
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: signInAccount,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: SignInValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: SignInType) => {
      mutation.mutate({
        email: `${values.email}`,
      });
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
        <div className="flex flex-col gap-1 mb-8">
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
          {mutation.isLoading ? <LoadingButton /> : "Sign in"}
        </Button>

        <div className="flex items-center gap-1 justify-center mt-2.5">
          <p className="text-gray-400">Don&apos;t have a account?</p>
          <p
            className="text-indigo-400 transition hover:text-indigo-300 cursor-pointer"
            onClick={() => route.push("/signup")}
          >
            Sign up
          </p>
        </div>
      </form>
    </>
  );
};

export default FormSignIn;
