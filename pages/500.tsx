import React from "react";
import Image from "next/image";
const myError = () => {
  return (
    <div className="h-screen w-screen  flex items-center justify-center  bg-white">
      <div>
        <Image
          src="/iconsimgs/404page.jpg"
          alt="500"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default myError;
