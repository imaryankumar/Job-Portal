import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext } from "../../contextapi/ContextAPI";
import style from "../navbar/Navbar.module.css";

function Navbar() {
  const { isLoggedIN, user, setLogout } = useContext(authcontext);
  const [click, setClick] = useState(false);
  const router = useRouter();
  const isHidden = useMemo(() => {
    return ["/login", "/signup"].includes(router.asPath) || isLoggedIN;
  }, [router, isLoggedIN]);

  const JustSubmit = () => setClick(!click);
  const LogoutClear = () => {
    setLogout();
  };
  useEffect(() => {
    if (
      !user &&
      !["/signup", "/login", "/forgotpassword", "/resetpassword", "/"].includes(
        router.asPath
      )
    ) {
      router.push("/login");
    }
  }, [router, user]);
  return (
    <div className="container-lg mx-20">
      <div className={style.wrapper}>
        <nav className="bg-[#303F60] py-2 ">
          <div className="flex justify-between items-center w-full ">
            <Link href={"/"}>
              <div className={style.logo}>
                <h2>
                  My<span className={style.span}>Jobs</span>
                </h2>
              </div>{" "}
            </Link>
            {!isHidden && (
              <Link href="/login">
                <button
                  type="button"
                  className={`${style.navbtns} ${isHidden ? "d-none" : ""}`}
                >
                  Login/Signup
                </button>
              </Link>
            )}
          </div>
        </nav>
        <div>
          {isLoggedIN ? (
            <div className={style.nav_pout}>
              <Link
                href={`${user?.userRole === 0 ? "/jobpost" : "/jobapplyyou"}`}
              >
                <h3 className={style.nav_ph3}>
                  {user?.userRole === 0 ? "Post a Job" : "Applied Jobs"}
                </h3>
              </Link>

              <span className={style.nav_span}>
                {user?.userRole === 0 ? "R" : "C"}
                <img
                  src="iconsimgs/arrow-down.png"
                  alt=""
                  className={style.nav_arrowbtn}
                  onClick={JustSubmit}
                />
                {click && (
                  <div
                    className={style.nav_logoutbtn}
                    onClick={() => LogoutClear()}
                  >
                    Logout
                  </div>
                )}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="border-b" />
    </div>
  );
}

export default Navbar;
