"use client";

import { FC } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";

interface PropType {
  image: string;
}

const PhotoCard: FC<PropType> = ({ image }) => {
  return (
    <Modal image={image}>
      <div className="relative h-36 w-36 sm:h-60 sm:w-64">
        <Image
          fill
          src={image}
          alt={`some photo`}
          className="rounded-lg object-cover"
        />
      </div>
    </Modal>
  );
};

export default PhotoCard;
