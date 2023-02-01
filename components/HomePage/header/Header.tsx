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
      <Seo title="HomePage" />

      <div className="bg-[#1A253C] ">
        <div className="mainWrapper">
          <header className=" md:ml-44 pt-16 pb-40 md:py-24 relative text-white flex flex-col justify-center items-center  md:block  ">
            <div className="flex md:block text-3xl sm:text-5xl md:text-6xl">
              <h1 className=" ">Welcome to</h1>
              <h1 className="ml-2 md:ml-0">
                My<span className="text-blue-400">Jobs</span>
              </h1>
            </div>
            <button
              className="border w-40 h-12 border-solid border-blue-400 p-2 md:py-2.5 md:px-7 mt-5 md:mt-10 bg-blue-400 md:text-base outline-none rounded-lg cursor-pointer"
              onClick={() =>
                router.push(
                  `${
                    user?.userRole === 0
                      ? "/postjobyou?page=1"
                      : "/jobforyou?page=1"
                  }`
                )
              }
            >
              Get Started
            </button>
            <div className="absolute -bottom-32 md:right-0 xl:right-20  ">
              <div className="relative w-full md:w-[400px] lg:w-[550px] xl:w-[700px]  aspect-video">
                <Image
                  src="/iconsimgs/mainimg.png"
                  width={622}
                  height={395}
                  alt=""
                />
              </div>
            </div>
          </header>
        </div>
      </div>
      {/* <div className="flex items-center px-0 sm:px-20 md:px-40 mainWrapper  flex-col lg:flex-row justify-center">
        <div className="text-white w-max lg:w-full mt-20 ">
          <h1 className="leading-none pb-4 mytexts">
            Welcome to <br />
            My<span className="text-[#43afff] font-bold">Jobs</span>
          </h1>
          <button
            className="border border-solid border-blue-400 py-2.5 px-7 bg-blue-400 outline-none rounded-lg cursor-pointer"
            onClick={() =>
              router.push(
                `${
                  user?.userRole === 0
                    ? "/postjobyou?page=1"
                    : "/jobforyou?page=1"
                }`
              )
            }
          >
            Get Started
          </button>
        </div>
        <div className="relative top-16 xl:top-28">
          <Image
            src="/iconsimgs/mainimg.png"
            alt=""
            width={1050}
            height={1050}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Header;
