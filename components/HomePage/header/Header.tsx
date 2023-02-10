import Image from "next/image";
import { useRouter } from "next/router";
import { authcontext } from "../../contextapi/ContextAPI";
import { useContext } from "react";
import Seo from "../../nexthead/Seo";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(authcontext);
  return (
    <div className=" ">
      <Seo title="JobPortal" />

      <div className="bg-dark-blue">
        <div className="mainWrapper">
          <header className=" md:ml-44 pt-16 pb-40 md:py-24 relative text-white flex flex-col justify-center pl-6  md:block  ">
            <div className=" text-3xl sm:text-5xl md:text-6xl">
              <h1 className=" ">Welcome to</h1>
              <h2 className="ml-0 md:ml-0">
                My<span className="text-light-blue">Jobs</span>
              </h2>
            </div>
            <button
              className="border text-[16px] font-medium  w-40 h-12 border-solid border-light-blue p-2 md:py-2.5 md:px-7 mt-5 md:mt-10 bg-light-blue md:text-base outline-none rounded-lg cursor-pointer"
              onClick={() =>
                router.push(
                  `${
                    user?.token
                      ? user?.userRole === 0
                        ? "/jobs-posted-by-you?page=1"
                        : "/jobs-for-you?page=1"
                      : "/sign-up"
                  }`
                )
              }
            >
              Get Started
            </button>
            <div className="absolute -bottom-32 right-0 xs:left-0 md:right-0 xl:right-20  ">
              <div className="relative w-full md:w-[400px] lg:w-[550px] xl:w-[700px]  aspect-video">
                <Image
                  src="/iconsimgs/mainimg.webp"
                  width={622}
                  height={395}
                  alt="Mainimage"
                />
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Header;
