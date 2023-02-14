import React from "react";
import Image from "next/image";
interface cardTypes {
  src: string;
  alt: string;
}
const SectionImg = ({ src, alt }: cardTypes) => {
  return (
    <div className="relative w-28 aspect-video md:w-40">
      <Image src={src} alt={alt} fill className=" object-contain " />
    </div>
  );
};

export default SectionImg;
