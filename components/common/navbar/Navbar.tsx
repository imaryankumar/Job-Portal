import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext, Tuser } from "../../contextapi/ContextAPI";
import Image from "next/image";

function Navbar() {
  const { isLoggedIN, user, setLogout } = useContext(authcontext);
  const [click, setClick] = useState(false);
  const router = useRouter();
  const isHidden = useMemo(() => {
    return ["/login", "/sign-up"].includes(router.asPath) || isLoggedIN;
  }, [router, isLoggedIN]);

  const JustSubmit = () => setClick(!click);
  const LogoutClear = () => {
    setClick(false);
    setLogout();
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as Tuser;
    if (
      !user?.token &&
      [
        "/post-job",
        "/jobs-posted-by-you",
        "/jobs-for-you",
        "/applied-jobs",
      ].includes(router.asPath)
    ) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container-lg mx-22 mainWrapper">
      <div className="px-0.5">
        <nav className={`bg-dark-blue py-4 px-4 md:px-20 mainWrapper`}>
          <div className="flex justify-between items-center w-full  ">
            <Link
              href={
                !isLoggedIN
                  ? "/"
                  : user?.userRole === 0
                  ? "/jobs-posted-by-you"
                  : "/jobs-for-you"
              }
            >
              <div className="text-white text-[1.6rem] font-[500] cursor-pointer  ">
                <Image
                  src="/iconsimgs/MyJobs.png"
                  alt="Logo"
                  width={82}
                  height={26}
                />
              </div>{" "}
            </Link>
            {isHidden !== undefined && !isHidden && (
              <Link href="/login">
                <button
                  type="button"
                  className={`text-center text-[12px] font-medium text-xs md:w-40 md:h-12  md:text-base text-white cursor-pointer border border-solid border-light-blue p-2 md:p-3 rounded bg-[#43afff33] ${
                    isHidden ? "d-none" : ""
                  }`}
                >
                  Login/Signup
                </button>
              </Link>
            )}
          </div>
        </nav>
        <div>
          {isLoggedIN ? (
            <div className="mt-[-3rem] xs:mt-[-3.4rem] text-white  pr-4 md:pr-20 flex items-end justify-end gap-[2%] cursor-pointer   ">
              <div className="">
                <Link
                  href={`${
                    user?.userRole === 0 ? "/post-job" : "/applied-jobs"
                  }`}
                >
                  <h1 className="md:mb-[22px] mb-[8px]  h-6 md:text-base text-[14px]  tracking-normal text-white opacity-80 xs:pl-2  ">
                    {user?.userRole === 0 ? "Post a Job" : "Applied Jobs"}
                  </h1>
                  <div
                    className={
                      router.asPath.includes("/post-job") ||
                      router.asPath.includes("/applied-jobs")
                        ? "md:border-b-4 w-[50px]  mx-auto border-b-2  border-solid border-light-blue "
                        : undefined
                    }
                  ></div>
                </Link>
              </div>
              <div className="flex items-center gap-3  " onClick={JustSubmit}>
                <div className="text-center md:w-12 md:h-12 w-9 h-9 bg-[#D9EFFF] rounded-[25px]  text-light-dark md:text-[18px] xs:my-[2px] text-[16px] mb-[10px]  md:pt-[10px] pt-[5px] cursor-pointer  ">
                  {user?.userRole === 0 ? "R" : "C"}
                </div>
                <Image
                  src="/iconsimgs/caretdown.svg"
                  alt="arrowdown"
                  className=" relative text-[#FFFFFF] md:-mt-[9px] xs:-mt-[-2px] "
                  width={13}
                  height={8}
                />

                {click && (
                  <div className="absolute">
                    <div
                      className="relative w-[100px] md:w-[112px] h-[47px] bg-white flex justify-center items-center mt-[6.5rem] ml-[-1.6rem] text-[14px] text-light-dark rounded cursor-pointer  z-50 "
                      onClick={() => LogoutClear()}
                    >
                      <div className="absolute right-4 top-0 mt-[-8px] ml-[18px] h-0 w-0 border border-l-[6px] border-r-[6px] border-b-8 border-t-0 border-l-transparent border-r-transparent border-b-white text-white"></div>
                      Logout
                    </div>
                  </div>
                )}
              </div>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" border-b-[1px] xl:min-w[1300px] mx-4 md:mx-20  border-white-blue opacity-20 " />
    </div>
  );
}

export default Navbar;
