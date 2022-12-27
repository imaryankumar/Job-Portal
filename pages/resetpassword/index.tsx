import { useRouter } from "next/router";
import React, { useState } from "react";
import Fields from "../../components/common/fields/Fields";
import style from "../resetpassword/Reset.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "../../components/nexthead/Seo";

const Index = () => {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(false);
  const router = useRouter();

  const { token } = router.query;
  const onResetPassword = async () => {
    try {
      if (newPass && newPass === conPass) {
        setConPass("");
        setNewPass("");
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
        console.log("result is ", res.message);
        toast.success("Password updated successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setISLoading(true);
        toast.error("Invalid Password");
        setError(true);
        setTimeout(() => {
          setISLoading(false);
        }, 1000);
      }
    } catch (e) {
      // console.log("Error");
      toast.error("Error Found");
    }
  };

  return (
    <>
      <ToastContainer />
      <Seo title="ResetPassword" />
      <div className={style.reset_header}>
        <div className="mainWrapper">
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
                <p className={style.login_errorpara}>Password do not Match.</p>
              ) : (
                ""
              )}
              <div className={style.reset_btn}>
                <button
                  className={style.reset_btns}
                  onClick={onResetPassword}
                  disabled={isLoading}
                  type="submit"
                  style={
                    isLoading
                      ? { backgroundColor: "white", color: "black" }
                      : { backgroundColor: "#43afff" }
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.reset_section}></div>
    </>
  );
};

export default Index;
