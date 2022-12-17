import React, { useState } from "react";
import style from "../forgotpassword/Forgot.module.css";
import Fields from "../../components/common/fields/Fields";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const onReset = () => {
    router.push("/resetpassword");
    console.log("hello");
  };
  return (
    <>
      <div className={style.forgot_header}>
        <div className={style.forgot_card}>
          <div className={style.forgot_content}>
            <h1 className={style.forgot_h1}>Forgot your password?</h1>
            <p className={style.forgot_p}>
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </p>
          </div>
          <div className={style.forgot_field}>
            <form onClick={() => onReset()}>
              <Fields
                type="email"
                content="Email address"
                placeholder="Enter your email"
                value={mail}
                onchange={setMail}
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
              />
              <div className={style.forgot_btn}>
                <button className={style.forgot_btns}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={style.forgot_section}></div>
    </>
  );
};

export default index;
