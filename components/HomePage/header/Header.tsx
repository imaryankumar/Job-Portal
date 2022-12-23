import Image from "next/image";
import { useRouter } from "next/router";
import style from "../header/Header.module.css";
import { authcontext } from "../../contextapi/ContextAPI";
import { useContext } from "react";

const header = () => {
  const router = useRouter();
  const { user } = useContext(authcontext);
  return (
    <div className={`${style.header}`}>
      {/* <div className={`mainWrapper`}> */}
      <div>
        <div className={style.header_txt}>
          <h1 className={style.header_h1}>
            Welcome to <br />
            My<span className={style.header_span}>Jobs</span>
          </h1>
          <button
            className={style.header_btns}
            onClick={() =>
              router.push(
                `${user?.userRole === 0 ? "/postjobyou" : "/jobforyou"}`
              )
            }
          >
            Get Started
          </button>
        </div>
        <div className={style.header_imgs}>
          <img
            src="mainimg.png"
            alt="headerimages"
            className={style.header_img}
          />
        </div>
      </div>
    </div>
  );
};

export default header;
