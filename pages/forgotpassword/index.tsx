import React, { useEffect, useState } from "react";
import style from "../forgotpassword/Forgot.module.css";
import Fields from "../../components/common/fields/Fields";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";

const Index = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [error, setError] = useState<{
    email?: string;
  }>();
  const [isLoading, setISLoading] = useState(false);
  function validateEmail(email: any) {
    let re = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }
  const setErrorState = (key: string, value: any) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const validateForm = async () => {
    let emailError = false;

    if (!mail.trim()) {
      setErrorState("email", "Email is required");
      emailError = true;
    } else {
      if (!validateEmail(mail)) {
        setErrorState("email", "Enter valid email");
        emailError = true;
      } else {
        setErrorState("email", false);
        emailError = false;
      }
    }
    return emailError;
  };
  const onReset = async (e?: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
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
    }
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
                pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                error={error?.email ? true : false}
              />
              {error ? (
                <p className={style.forgot_errorpara}>{error.email}</p>
              ) : (
                ""
              )}
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
