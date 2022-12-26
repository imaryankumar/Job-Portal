import React, { use, useEffect, useState } from "react";
import style from "../forgotpassword/Forgot.module.css";
import Fields from "../../components/common/fields/Fields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";

const index = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(false);
  const onReset = (e?: any) => {
    e.preventDefault();
    if (mail === "") {
      setError(true);
    }
    getData();
  };

  const getData = async () => {
    try {
      const alldata = await fetch(
        `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${mail}`
      );
      const res = await alldata.json();
      if (res.data && res.data.token) {
        const myData = await fetch(`
        https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${res.data.token}`);
        const resmyData = await myData.json();
        // console.log("resmyData", resmyData);
        if (resmyData.code === 200) {
          router.push(`/resetpassword?token=${res.data.token}`);
        } else {
          alert("Error");
        }
      } else {
        // Toast
        setISLoading(true);
        toast.error(res.message);
      }
    } catch (error) {
      //  console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Seo title="ForgotpagePassword" />
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
            <form onSubmit={(e) => onReset(e)}>
              <Fields
                type="email"
                content="Email address"
                placeholder="Enter your email"
                value={mail}
                onchange={setMail}
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                error={error}
              />
              {/* {error ? (
                <p className={style.forgot_errorpara}>The Field is mandatory</p>
              ) : (
                ""
              )} */}
              <div className={style.forgot_btn}>
                <button
                  className={style.forgot_btns}
                  disabled={isLoading}
                  style={
                    isLoading
                      ? { backgroundColor: "white", color: "black" }
                      : { backgroundColor: "#43afff" }
                  }
                >
                  Submit
                </button>
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
