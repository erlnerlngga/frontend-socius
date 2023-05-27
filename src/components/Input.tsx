"use client";
import { ChangeEvent, FC } from "react";

interface PropType {
  inputType: "text" | "email" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  id: string;
  name: string;
  placeholder?: string;
  style?: string;
}

const Input: FC<PropType> = ({
  inputType,
  onChange,
  value,
  id,
  name,
  placeholder,
  style,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={inputType}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`outline-none py-1.5 px-4 bg-neutral-800 text-gray-300 rounded-lg border-2 border-indigo-500 ${style}`}
    />
  );
};

export default Input;
