import React, { useState } from "react";
import Fields from "../../components/common/fields/Fields";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";
import Buttons from "../../components/common/Button/Buttons";

const Index = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [error, setError] = useState<{
    email?: string;
  }>();
  const [isLoading, setISLoading] = useState(false);
  const [loader, setLoader] = useState(false);
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
  const forgotpassHandler = async (e?: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      setISLoading(true);
      setLoader(true);
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
              .then((res) => {
                if (res.code === 200) {
                  router.push(`/resetpassword?token=${data?.data?.token}`);
                } else {
                  toast.error("Error Found");
                }
              });
          } else {
            setISLoading(true);
            toast.error(data.message);
            setLoader(false);
          }
        })
        .catch(() => {
          toast.error("Error Found");
        });
    }
  };

  return (
    <>
      <Seo title="Forgot your password" />
      <div className="bg-dark-blue w-full h-[33vh] 2xl:h-[15vh] text-white flex items-center justify-center ">
        <div className=" md:w-[557px] h-[318px] bg-white box-shadows rounded-3xl mt-48 2xl:mt-[15rem] flex flex-col items-center w-[420px] xs:w-[315px]  ">
          <div className="px-1 py-2 w-[380px] md:w-[500px] xs:w-[290px] ">
            <h1 className="text-light-dark text-[22px] font-medium py-2 px-0 ">
              Forgot your password?
            </h1>
            <p className="text-sm text-light-dark py-2 px-0">
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </p>
          </div>
          <div className=" w-[380px] xs:w-[285px] md:w-[500px]">
            <form onSubmit={(e) => forgotpassHandler(e)}>
              <Fields
                type="email"
                content="Email address"
                placeholder="Enter your email"
                value={mail}
                onchange={(value: string) => {
                  setMail(value);
                  validateMail(value);
                  setISLoading(false);
                }}
                onBlur={() => {
                  validateMail(mail);
                }}
                pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                error={error?.email ? true : false}
                required
              >
                {error ? (
                  <p className="text-dark-red text-right text-xs  ">
                    {error.email}
                  </p>
                ) : (
                  ""
                )}
              </Fields>
              <div className="flex items-center justify-center mt-5 ">
                {/* <button
                  className={`md:w-40 w-32 h-[40px] text-[16px] font-medium  md:h-[46px] bg-light-blue border border-solid border-light-blue rounded  flex items-center justify-center mt-5 xs:mt-4 md:mt-8 cursor-pointer text-[#fff] ${
                    isLoading
                      ? "  bg-light-blue   text-white  cursor-no-drop  "
                      : "bg-light-blue text-white "
                  }`}
                  disabled={isLoading}
                >
                  {loader ? <Loader /> : "Submit "}
                </button> */}
                <Buttons
                  isLoading={isLoading}
                  loader={loader}
                  type={"submit"}
                  name={"Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-white-blue w-full h-auto"></div>
    </>
  );
};

export default Index;
