import Image from "next/image";
import { useRouter } from "next/router";
import { authcontext } from "../../contextapi/ContextAPI";
import { useContext } from "react";
import Seo from "../../nexthead/Seo";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(authcontext);
  return (
    <div className="w-full flex items-center justify-between bg-[#303f60] text-white relative ">
      <Seo title="HomePage" />
      <div className="flex items-center px-0 sm:px-20 md:px-40 mainWrapper  flex-col lg:flex-row justify-center">
        <div className="text-[#ffffff] w-max lg:w-full mt-20 ">
          <h1 className="leading-none pb-4 mytexts">
            Welcome to <br />
            My<span className="text-[#43afff] font-bold">Jobs</span>
          </h1>
          <button
            className="border border-solid border-[#43afff] py-2.5 px-7 bg-[#43afff] outline-none rounded-lg cursor-pointer"
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
      </div>
    </div>
  );
};

export default Header;
