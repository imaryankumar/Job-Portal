import React, { useEffect, useState } from "react";
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
  function validateMail(mail: string) {
    if (!mail.trim()) {
      setErrorState("email", "Email is required");
      return true;
    } else {
      if (!validateEmail(mail)) {
        setErrorState("email", "Enter valid email");
        return true;
      } else {
        setErrorState("email", false);
        return false;
      }
    }
  }
  const validateForm = async () => {
    let emailError = false;
    emailError = validateMail(mail);

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
      <div className="bg-[#1A253C] w-full h-[40vh] text-white flex items-center justify-center ">
        <div className=" md:w-[557px] h-[318px] bg-white box-shadows rounded-3xl mt-56 flex flex-col items-center w-[420px] xs:w-[305px]  ">
          <div className="px-1 py-2 w-[380px] md:w-[500px] xs:w-[285px] ">
            <h1 className="text-[#303f60] text-xl py-2 px-0 ">
              Forgot your password?
            </h1>
            <p className="text-sm text-[#303f60] py-2 px-0">
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </p>
          </div>
          <div className=" w-[380px] xs:w-[280px] md:w-[500px]">
            <form onSubmit={(e) => onReset(e)}>
              <Fields
                type="email"
                content="Email address"
                placeholder="Enter your email"
                value={mail}
                // onchange={setMail}
                onchange={(value: string) => {
                  setMail(value);
                  validateMail(value);
                }}
                onBlur={() => {
                  validateMail(mail);
                }}
                pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                error={error?.email ? true : false}
              >
                {error ? (
                  <p className="text-red-700 text-right text-xs  ">
                    {error.email}
                  </p>
                ) : (
                  ""
                )}
              </Fields>
              <div className="flex items-center justify-center">
                <button
                  className="md:w-40 w-32 h-[40px] md:h-[46px] bg-blue-400 border-blue-400 rounded opacity-100 flex items-center justify-center mt-5 xs:mt-4 md:mt-8 cursor-pointer text-[#fff]"
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
      <div className="bg-[#edf6ff] w-full h-auto"></div>
    </>
  );
};

export default Index;
