"use client";
import { useRouter } from "next/navigation";
import { FC, ReactNode, MouseEvent } from "react";

interface PropType {
  children: ReactNode;
  href: string;
  className: string;
}

const LinkCustom: FC<PropType> = ({ children, href, className }) => {
  const route = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    route.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default LinkCustom;
