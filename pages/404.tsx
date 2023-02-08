import React from "react";
import Image from "next/image";
const Error = () => {
  return (
    <div className="h-screen w-screen  flex items-center justify-center  bg-white">
      <div>
        <Image
          src="/iconsimgs/404page.jpg"
          alt="404"
         fill
         className="object-contain"
        />
      </div>
    </div>
  );
};

export default Error;
