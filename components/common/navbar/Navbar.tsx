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
    return ["/login", "/signup"].includes(router.asPath) || isLoggedIN;
  }, [router, isLoggedIN]);

  const JustSubmit = () => setClick(!click);
  const LogoutClear = () => {
    setClick(false);
    setLogout();
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as Tuser;
    if (
      !user.token &&
      !["/signup", "/login", "/forgotpassword", "/"].includes(router.asPath) &&
      !router.asPath.includes("/resetpassword")
    ) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="container-lg mx-22 mainWrapper">
      <div className="px-0.5">
        <nav className={`bg-[#1A253C] py-4 px-4 md:px-20 mainWrapper`}>
          <div className="flex justify-between items-center w-full  ">
            <Link href={"/"}>
              <div className="text-white text-[1.6rem] font-[500] cursor-pointer  ">
                <Image
                  src="/iconsimgs/MyJobs.png"
                  alt="Logo"
                  width={82}
                  height={26}
                />
              </div>{" "}
            </Link>
            {!isHidden && (
              <Link href="/login">
                <button
                  type="button"
                  className={`text-center  md:w-40 md:h-12 text-xs md:text-base text-white cursor-pointer border border-solid border-blue-400 p-2 md:p-3 rounded bg-[#43afff33] ${
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
            <div className="mt-[-3rem] xs:mt-[-3.4rem] text-white  pr-4 md:pr-20 flex items-end justify-end gap-[3%] cursor-pointer   ">
              <Link
                href={`${user?.userRole === 0 ? "/jobpost" : "/jobappliedyou"}`}
                className={
                  router.asPath.includes("/jobpost") ||
                  router.asPath.includes("/jobappliedyou")
                    ? "md:border-b-4 border-b-2 border-solid border-blue-400 "
                    : undefined
                }
              >
                <h3 className="md:mb-[20px] mb-[12px] w-20 h-6 md:text-base text-[14px]  tracking-normal text-white opacity-80 xs:pl-2  ">
                  {user?.userRole === 0 ? "Post a Job" : "Applied Jobs"}
                </h3>
              </Link>
              <div className="flex items-center gap-3  " onClick={JustSubmit}>
                <div className="text-center md:w-12 md:h-12 w-11 h-11 bg-[#D9EFFF] rounded-[25px] opacity-100 text-[#303F60] md:text-[18px] xs:my-[5px] text-[16px] mb-[10px]  md:pt-[8px] pt-[10px] cursor-pointer  ">
                  {user?.userRole === 0 ? "R" : "C"}
                </div>
                <Image
                  src="/iconsimgs/arrow-down.png"
                  alt="arrowdown"
                  className=" relative text-[#FFFFFF]"
                  width={17}
                  height={10}
                />

                {click && (
                  <div
                    className=" w-[112px] h-[47px] bg-white flex justify-center items-center mt-[7rem] ml-[-1.6rem] text-[14px] text-[#303f60] rounded cursor-pointer absolute z-50 "
                    onClick={() => LogoutClear()}
                  >
                    Logout
                  </div>
                )}
              </div>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" border-b-2 mx-4 md:mx-20  border-[#EDF6FF] opacity-20 " />
    </div>
  );
}

export default Navbar;
