"use client";

import { FC, ReactNode, useState } from "react";
import ModalChildChat from "./ModalChildChat";

interface PropType {
  children: ReactNode;
  content: FC;
}

const ModalChat: FC<PropType> = ({ children, content }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      {open && <ModalChildChat close={handleClose} content={content} />}
    </>
  );
};

export default ModalChat;
