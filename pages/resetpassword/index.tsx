import { useRouter } from "next/router";
import React, { useState } from "react";
import Fields from "../../components/common/fields/Fields";
import { toast } from "react-toastify";

import Seo from "../../components/nexthead/Seo";
import Loader from "../../components/Loader/Loader";

const Index = () => {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const { token } = router.query;
  const onResetPassword = () => {
    if (newPass && newPass === conPass) {
      setConPass("");
      setNewPass("");

      setISLoading(true);
      setLoader(true);
      fetch("https://jobs-api.squareboat.info/api/v1/auth/resetpassword", {
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
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.success("Password updated successfully");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        })
        .catch((e) => {
          toast.error(e);
        })
        .finally(() => {
          setISLoading(false);
        });
    } else {
      setError(true);
      toast.error("Invalid Password");
      setLoader(false);
    }
  };

  return (
    <>
      <Seo title="ResetPassword" />
      <div className="bg-[#1A253C] w-full h-[40vh]  text-white flex items-center justify-center">
        <div className="mainWrapper">
          <div className="md:w-[557px] w-[450px] xs:w-[310px] h-[420px] bg-white box-shadows rounded-[20px] mt-[21rem] flex flex-col items-center">
            <div className="text-[#303f60] w-full py-4 px-7 ">
              <h1 className="text-[#303f60] text-[22px] font-medium py-4 px-0">
                Reset Your Password
              </h1>
              <h3 className="text-[14px] text-[#303f60] pb-4">
                Enter your new password below.
              </h3>
              <Fields
                type="password"
                content="New password"
                placeholder="Enter your password"
                value={newPass}
                onchange={setNewPass}
                error={error}
                required
                onBlur={() => {
                  console.log();
                }}
              />
              <Fields
                type="password"
                content="Confirm new password"
                placeholder="Enter your password"
                value={conPass}
                onchange={setConPass}
                error={error}
                required
                onBlur={() => {
                  console.log();
                }}
              >
                {error ? (
                  <p className="text-red-500 text-right text-xs">
                    Password do not Match.
                  </p>
                ) : (
                  ""
                )}
              </Fields>
              <div className="flex items-center justify-center">
                <button
                  className="w-40 h-[46px] bg-blue-400 text-[16px] font-medium  border-blue-400 rounded-md opacity-100 flex items-center justify-center mt-8 cursor-pointer text-[#fff]"
                  onClick={onResetPassword}
                  disabled={isLoading}
                  type="submit"
                  style={
                    isLoading
                      ? { backgroundColor: "white", color: "black" }
                      : { backgroundColor: "#43afff" }
                  }
                >
                  {loader ? <Loader /> : "Reset"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#edf6ff] w-full h-auto"></div>
    </>
  );
};

export default Index;
