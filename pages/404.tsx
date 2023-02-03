import React from "react";
import Image from "next/image";
const Error = () => {
  return (
    <div className="h-full w-full xs:py-[13rem] flex items-center justify-center mainWrapper bg-white">
      <div>
        <Image
          src="/iconsimgs/404page.jpg"
          alt="404"
          width={900}
          height={100}
        />
      </div>
    </div>
  );
};

export default Error;
