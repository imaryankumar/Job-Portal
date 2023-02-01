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
        <nav className={`bg-[#1A253C] py-4 px-8 md:px-20 mainWrapper`}>
          <div className="flex justify-between items-center w-full  ">
            <Link href={"/"}>
              <div className="text-white text-[1.6rem] font-[500] cursor-pointer ">
                {/* <h2 className="text-xl">
                  My
                  <span className="text-blue-500 text-xl font-bold">Jobs</span>
                </h2> */}
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
            <div className="mt-[-3rem] text-white pr-[7rem] flex items-end justify-end gap-[3%] cursor-pointer ">
              <Link
                href={`${user?.userRole === 0 ? "/jobpost" : "/jobappliedyou"}`}
                className={
                  router.asPath.includes("/jobpost") ||
                  router.asPath.includes("/jobappliedyou")
                    ? "border-b-4 border-solid border-blue-400 "
                    : undefined
                }
              >
                <h3 className="mb-[25px] w-20 h-6 text-base tracking-normal text-white opacity-80 ">
                  {user?.userRole === 0 ? "Post a Job" : "Applied Jobs"}
                </h3>
              </Link>
              <span
                className="text-center w-12 h-12 bg-[#D9EFFF] rounded-[25px] opacity-100 text-[#303F60] text-[18px] mb-[10px] pt-[8px] cursor-pointer "
                onClick={JustSubmit}
              >
                {user?.userRole === 0 ? "R" : "C"}
                <Image
                  src="/iconsimgs/arrow-down.png"
                  alt=""
                  className="ml-[3.5rem] mt-[-0.9rem] relative text-[#FFFFFF]"
                  width={17}
                  height={10}
                />

                {click && (
                  <div
                    className="w-[112px] h-[47px] bg-white flex justify-center items-center mt-[1.5rem] ml-[-1.6rem] text-[14px] text-[#303f60] rounded cursor-pointer absolute z-50 "
                    onClick={() => LogoutClear()}
                  >
                    Logout
                  </div>
                )}
              </span>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" border-b-2 mx-8 md:mx-20  border-[#EDF6FF] opacity-20 " />
    </div>
  );
}

export default Navbar;
