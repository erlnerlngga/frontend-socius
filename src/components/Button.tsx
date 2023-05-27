"use client";

import { FC, ReactNode } from "react";

interface PropType {
  buttonType: "submit" | "button";
  children: ReactNode;
  style?: string;
  onClick?: () => void;
}

const Button: FC<PropType> = ({
  buttonType = "button",
  children,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={`py-1.5 px-6 w-full shadow-lg bg-indigo-500 tracking-wider text-white font-semibold rounded-lg transition hover:bg-opacity-80 ${style}`}
    >
      {children}
    </button>
  );
};

export default Button;
