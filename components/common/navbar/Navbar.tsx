import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { authcontext } from "../../contextapi/ContextAPI";
import style from "../navbar/Navbar.module.css";

function Navbar() {
  const { isLoggedIN, user, setLogout } = useContext(authcontext);
  const [click, setClick] = useState(false);
  const router = useRouter();
  const isHidden = useMemo(() => {
    return ["/login", "/signup"].includes(router.asPath) || isLoggedIN;
  }, [router]);

  const JustSubmit = () => setClick(!click);
  const LogoutClear = () => {
    setLogout();
  };
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
            <Link href="/login">
              <button
                type="button"
                className={style.navbtns}
                style={isHidden ? { display: "none" } : {}}
              >
                Login/Signup
              </button>
            </Link>
          </div>
        </nav>
        <div>
          {isLoggedIN && router.asPath == "/postjobyou" ? (
            <div className={style.nav_pout}>
              <h3 className={style.nav_ph3}>Post a Job</h3>

              <span className={style.nav_span}>
                R{" "}
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
