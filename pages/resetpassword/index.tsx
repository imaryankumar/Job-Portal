import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Fields from "../../components/common/fields/Fields";
import style from "../resetpassword/Reset.module.css";

const index = () => {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const { token } = router.query;
  const onResetPassword = async () => {
    if (newPass && newPass === conPass) {
      console.log("Good");
      setConPass("");
      setNewPass("");
      setError(false);
      //  console.log("newpass", newPass, "conPass", conPass, "Token", token);
      const data = await fetch(
        "https://jobs-api.squareboat.info/api/v1/auth/resetpassword",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPass,
            confirmPassword: conPass,
            token: token,
          }),
        }
      );
      const res = await data.json();
      // console.log(res);
    } else {
      setError(true);
    }
  };

  // const getData = async () => {
  //   const data = await fetch(
  //     "https://jobs-api.squareboat.info/api/v1/auth/resetpassword"
  //   );
  //   const res = await data.json();
  //   console.log("res is : ", res);
  // };

  return (
    <>
      <div className={style.reset_header}>
        <div className={style.reset_card}>
          <div className={style.reset_content}>
            <h1 className={style.reset_h1}>Reset Your Password</h1>
            <h3 className={style.reset_h3}>Enter your new password below.</h3>
            <Fields
              type="password"
              content="New password"
              placeholder="Enter your password"
              value={newPass}
              onchange={setNewPass}
              error={error}
            />
            <Fields
              type="password"
              content="Confirm new password"
              placeholder="Enter your password"
              value={conPass}
              onchange={setConPass}
              error={error}
            />
            {error ? (
              <p className={style.login_errorpara}>Don't Match Password.</p>
            ) : (
              ""
            )}
            <div className={style.reset_btn}>
              <button className={style.reset_btns} onClick={onResetPassword}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.reset_section}></div>
    </>
  );
};

export default index;
