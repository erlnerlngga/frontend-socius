"use client";

import { FC, ReactNode, useState } from "react";
import ModalChild from "./ModalChild";

interface PropType {
  children: ReactNode;
  image: string;
}

const Modal: FC<PropType> = ({ children, image }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      {open && <ModalChild close={handleClose} image={image} />}
    </>
  );
};

export default Modal;
