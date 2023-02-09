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
      !user.token &&
      ["/post-job", "/jobs-posted-by-you", "/jobs-for-you", "/applied-jobs"].includes(
        router.asPath
      )
    ) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="container-lg mx-22 mainWrapper">
      <div className="px-0.5">
        <nav className={`bg-dark-blue py-4 px-4 md:px-20 mainWrapper`}>
          <div className="flex justify-between items-center w-full  ">
            <Link href={!isLoggedIN?"/":user?.userRole === 0 ?'/jobs-posted-by-you':'/jobs-for-you'}>
              <div className="text-white text-[1.6rem] font-[500] cursor-pointer  ">
                <Image
                  src="/iconsimgs/MyJobs.png"
                  alt="Logo"
                  width={82}
                  height={26}
                />
              </div>{" "}
            </Link>
            {isHidden!==undefined && !isHidden && (
              <Link href="/login">
                <button
                  type="button"
                  className={`text-center text-[16px] font-medium  md:w-40 md:h-12 text-xs md:text-base text-white cursor-pointer border border-solid border-light-blue p-2 md:p-3 rounded bg-[#43afff33] ${
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
                href={`${user?.userRole === 0 ? "/post-job" : "/applied-jobs"}`}
                className={
                  router.asPath.includes("/post-job") ||
                  router.asPath.includes("/applied-jobs")
                    ? "md:border-b-4 border-b-2 border-solid border-light-blue "
                    : undefined
                }
              >
                <h1 className="md:mb-[22px] mb-[12px]  h-6 md:text-base text-[14px]  tracking-normal text-white opacity-80 xs:pl-2  ">
                  {user?.userRole === 0 ? "Post a Job" : "Applied Jobs"}
                </h1>
              </Link>
              <div className="flex items-center gap-3  " onClick={JustSubmit}>
                <div className="text-center md:w-12 md:h-12 w-11 h-11 bg-[#D9EFFF] rounded-[25px]  text-light-dark md:text-[18px] xs:my-[5px] text-[16px] mb-[10px]  md:pt-[10px] pt-[10px] cursor-pointer  ">
                  {user?.userRole === 0 ? "R" : "C"}
                </div>
                <Image
                  src="/iconsimgs/caretdown.svg"
                  alt="arrowdown"
                  className=" relative text-[#FFFFFF] -mt-[9px] "
                  width={13}
                  height={8}
                />

                {click && (
                  <div
                    className=" w-[112px] h-[47px] bg-white flex justify-center items-center mt-[7rem] ml-[-1.6rem] text-[14px] text-light-dark rounded cursor-pointer absolute z-50 "
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
      <div className=" border-b-2 mx-4 md:mx-20  border-white-blue opacity-20 " />
    </div>
  );
}

export default Navbar;
