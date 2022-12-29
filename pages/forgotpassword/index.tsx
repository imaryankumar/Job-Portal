import React, { useEffect, useState } from "react";
import style from "../forgotpassword/Forgot.module.css";
import Fields from "../../components/common/fields/Fields";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";

const Index = () => {
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

  const getData = () => {
    fetch(
      `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${mail}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data && data?.data?.token) {
          fetch(`
          https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${data?.data?.token}`)
            .then((resData) => {
              return resData.json();
            })
            .then((data) => {
              console.log("456", data);
              if (data.code === 200) {
                router.push(`/resetpassword?token=${data?.data?.token}`);
              } else {
                toast.error("Error Found");
              }
            });
        } else {
          setISLoading(false);
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Error Found");
      });
  };

  return (
    <>
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

export default Index;
