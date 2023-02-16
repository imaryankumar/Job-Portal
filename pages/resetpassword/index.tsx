import { useRouter } from "next/router";
import React, { useState } from "react";
import Fields from "../../components/common/fields/Fields";
import { toast } from "react-toastify";

import Seo from "../../components/nexthead/Seo";
import Loader from "../../components/Loader/Loader";

const Index = () => {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState<{
    password?: string;
    confirmPassword?: string;
  }>();
  const [isLoading, setISLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  function validatePassword(password: string) {
    if (!password) {
      setErrorState("password", "Password is required");
      return true;
    } else {
      if (password.length < 6) {
        setErrorState("password", "Password should be min 6 characters");
        return true;
      } else {
        setErrorState("password", false);
        return false;
      }
    }
  }

  function validateConfirmPassword(password: string, conpassword: string) {
    if (conpassword.length === 0) {
      setErrorState("confirmPassword", "Password is required");
      return true;
    } else if (password !== conpassword) {
      setErrorState("confirmPassword", "Passwords do not match");
      return true;
    } else {
      setErrorState("confirmPassword", false);
      return false;
    }
  }

  const validateForm = async () => {
    let passwordError = false;
    let confirmPasswordError = false;
    passwordError = validatePassword(newPass);
    confirmPasswordError = validateConfirmPassword(newPass, conPass);
    return passwordError || confirmPasswordError;
  };

  const resetpasswordHandler = async (e: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      if (newPass && newPass === conPass) {
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

            router.push("/login");
          })
          .catch((e) => {
            toast.error(e);
            setISLoading(true);
          })
          .finally(() => {
            setISLoading(true);
          });
      } else {
        toast.error("Invalid Password");
        setISLoading(true);
        setLoader(false);
      }
    }
  };
  const setErrorState = (key: string, value: any) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <Seo title="Reset Your Password" />
      <div className="bg-dark-blue w-full h-[40vh]  2xl:h-[16vh] text-white flex items-center justify-center">
        <div className="mainWrapper">
          <div className="md:w-[557px] w-[450px] xs:w-[310px] h-[420px] bg-white box-shadows rounded-[20px] mt-[21rem] flex flex-col items-center">
            <div className="text-light-dark w-full py-4 px-7  ">
              <h1 className="text-light-dark text-[22px] font-medium py-4 xs:py-2 px-0  ">
                Reset Your Password
              </h1>
              <h3 className="text-[14px] text-light-dark pb-4">
                Enter your new password below.
              </h3>

              <form onSubmit={(e) => resetpasswordHandler(e)}>
                <Fields
                  type="password"
                  content="New password"
                  placeholder="Enter your password"
                  value={newPass}
                  onchange={(value: string) => {
                    setNewPass(value);
                    validatePassword(value);
                    setISLoading(false);
                  }}
                  error={
                    error?.password || error?.confirmPassword ? true : false
                  }
                  required
                  onBlur={() => {
                    validatePassword(newPass);
                  }}
                >
                  {error?.password && (
                    <p className="text-[#FF0000] text-right text-xs">
                      {error?.password}
                    </p>
                  )}
                </Fields>
                <Fields
                  type="password"
                  content="Confirm new password"
                  placeholder="Enter your password"
                  error={error?.confirmPassword ? true : false}
                  value={conPass}
                  onchange={(value: string) => {
                    setConPass(value);
                    setISLoading(false);
                    validateConfirmPassword(newPass, value);
                  }}
                  required
                  onBlur={() => {
                    validateConfirmPassword(newPass, conPass);
                  }}
                >
                  {error?.confirmPassword && (
                    <p className="text-[#FF0000] text-right text-xs">
                      {error?.confirmPassword}
                    </p>
                  )}
                </Fields>
                <div className="flex items-center justify-center">
                  <button
                    className="w-40 h-[46px] bg-light-blue border text-[16px] font-medium  border-light-blue rounded-md  flex items-center justify-center mt-6 cursor-pointer text-[#fff]"
                    disabled={isLoading}
                    type="submit"
                    style={
                      isLoading
                        ? {
                            backgroundColor: "#43AFFF",
                            color: "white",
                            cursor: "no-drop",
                          }
                        : { backgroundColor: "#43AFFF", color: "white" }
                    }
                  >
                    {loader ? <Loader /> : "Reset"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white-blue w-full h-auto"></div>
    </>
  );
};

export default Index;
