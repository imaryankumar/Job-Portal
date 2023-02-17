import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import Router from "next/router";
import Seo from "../../components/nexthead/Seo";
import { useEffect, useCallback } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

const Index = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [role, setRole] = useState(0);
  const [recbtn, setRecbtn] = useState(true);
  const [candbtn, setCandbtn] = useState(false);
  const [skill, setSkill] = useState("");
  const [loader, setLoader] = useState(false);
  const [redirect, setRedirect] = useState(true);
  const [error, setError] = useState<{
    name?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
    skills?: string;
  }>();
  const [isLoading, setISLoading] = useState(false);
  interface dataType {
    success?: boolean;
    code: number;
    errors?: any[];
  }
  const values = { name, mail, password, conpassword, skill };

  const unSavedChanges = useCallback(() => {
    if (
      values.mail.length > 0 ||
      values.name.length > 0 ||
      values.password.length > 0 ||
      values.conpassword.length > 0 ||
      values.skill.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [values]);

  useEffect(() => {
    if (unSavedChanges()) {
      const routeChangeStart = (e: any) => {
        if (redirect) {
          const ok = confirm("Are you sure you want to exit?");
          if (!ok) {
            Router.events.emit("routeChangeError");
            window.history.pushState(null, "sign-up", "/sign-up");
            throw "Abort route change.";
          }
        }
      };
      Router.events.on("routeChangeStart", routeChangeStart);
      return () => {
        Router.events.off("routeChangeStart", routeChangeStart);
      };
    }
  }, [unSavedChanges, Router, redirect]);

  function validateName(name: string) {
    if (!name.trim()) {
      setErrorState("name", "Name is required");
      return true;
    } else if (name.length > 100) {
      setErrorState("name", "Maximum character limit 100 ");
      return true;
    }
    let re = /^[a-zA-Z]+$/;
    if (!re.test(name)) {
      setErrorState("name", "Enter valid name");
      return true;
    }
    setErrorState("name", false);
    return false;
  }

  function validateEmail(email: string) {
    if (!mail.trim()) {
      setErrorState("email", "Email is required");
      return true;
    }
    let re = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!re.test(email)) {
      setErrorState("email", "Enter valid email");
      return true;
    }
    setErrorState("email", false);
    return false;
  }

  function validatePassword(password: string) {
    if (!password || password.trim().length === 0) {
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
    if (conpassword.length === 0 || conpassword.trim().length === 0) {
      setErrorState("confirmPassword", "Confirm Password is required");
      return true;
    } else if (password !== conpassword) {
      setErrorState("confirmPassword", "Passwords do not match");
      return true;
    } else {
      setErrorState("confirmPassword", false);
      return false;
    }
  }
  function validateSkill(skill: string) {
    if (Number(role) === 1 && !skill.trim()) {
      setErrorState("skills", "Skills is required");
      return true;
    }
    let rest = /^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i;
    if (!rest.test(skill) && Number(role) === 1) {
      setErrorState("skills", "Enter comma seprated skills");
      return true;
    }

    setErrorState("skills", false);
    return false;
  }

  const setErrorState = (key: string, value: any) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const validateForm = async () => {
    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let skillsError = false;

    nameError = validateName(name);
    emailError = validateEmail(mail);
    passwordError = validatePassword(password);
    confirmPasswordError = validateConfirmPassword(password, conpassword);
    skillsError = validateSkill(skill);

    return (
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      skillsError
    );
  };
  const [data, setData] = useState<dataType | undefined>(undefined);

  function RecrBtn() {
    setRole(0);
    setRecbtn(true);
    setCandbtn(false);
  }
  function CandiBtn() {
    setRole(1);
    setCandbtn(true);
    setRecbtn(false);
  }

  const signupHandle = async (e: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      const body = {
        email: mail,
        userRole: role,
        password: password,
        confirmPassword: conpassword,
        name: name,
        skills: skill,
      };
      setISLoading(true);
      setLoader(true);
      setRedirect(false);
      fetch("https://jobs-api.squareboat.info/api/v1/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((finalRes) => {
          if (finalRes.success) {
            setData(finalRes);
            setName("");
            setMail("");
            setPassword("");
            setConpassword("");
            setSkill("");
            toast.success(finalRes.message);
            Router.push("/login");
          } else {
            setError({});
            if (finalRes?.message) {
              toast.error(finalRes.message);
              setISLoading(true);
            } else {
              const errors = finalRes?.errors;
              errors.forEach((item: any) => {
                setError((prev) => ({
                  ...prev,
                  [Object.keys(item)[0]]: Object.values(item)[0],
                }));
              });
            }
          }
        })
        .catch((e) => {
          toast.error(e);
          toast.error("Error Found");
          setISLoading(true);
          setLoader(false);
        })
        .finally(() => {
          setISLoading(true);
          setLoader(false);
        });
    }
  };

  return (
    <>
      <Seo title="Signup" />
      <div className="bg-dark-blue w-full xs:h-[60vh] h-[40vh] 2xl:h-[15vh] text-white flex items-center justify-center">
        <div className="mainWrapper">
          <div className="md:w-[557px] xs:w-[330px] w-[400px] h-auto bg-white box-shadows rounded-[20px] mt-[25rem] md:mt-[38rem]  flex flex-col items-center text-light-dark pb-4  ">
            <div className="w-full  md:px-10 px-4  ">
              <h1 className="text-[22px] font-medium text-light-dark py-6 xs:py-3  ">
                Signup
              </h1>
              <h2 className="pb-2 text-[14px]">
                I’m a<span className="Required_field">*</span>
              </h2>
              <div className="flex">
                <button
                  type="button"
                  className={`w-[136px] h-[46px] bg-[#e8e8e833] text-black border border-solid border-[#c6c6c6] rounded cursor-pointer text-[14px] flex items-center justify-evenly mr-6 ${
                    recbtn && "BtnTrue"
                  }`}
                  onClick={() => RecrBtn()}
                >
                  <FaUserTie fontSize={25} />
                  Recruiter
                </button>
                <button
                  type="button"
                  className={`w-[136px] h-[46px] bg-[#e8e8e833] text-black border border-solid border-[#c6c6c6] rounded cursor-pointer text-[14px] flex items-center justify-evenly mr-6 ${
                    candbtn && "BtnTrue"
                  }`}
                  onClick={() => CandiBtn()}
                >
                  <MdPeopleAlt fontSize={25} />
                  Candidate
                </button>
              </div>
              <div className="my-4  ">
                <form onSubmit={(e) => signupHandle(e)}>
                  <Fields
                    type="text"
                    content="Full Name"
                    placeholder="Enter your full name"
                    error={error?.name ? true : false}
                    value={name}
                    onchange={(value: string) => {
                      setName(value);
                      validateName(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateName(name);
                    }}
                    required
                  >
                    {error?.name && (
                      <p className="text-dark-red text-right  text-xs">
                        {error.name}
                      </p>
                    )}
                  </Fields>
                  <Fields
                    type="text"
                    content="Email Address"
                    placeholder="Enter your email"
                    error={error?.email ? true : false}
                    value={mail}
                    onchange={(value: string) => {
                      setMail(value);
                      validateEmail(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateEmail(mail);
                    }}
                    pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                    required
                  >
                    {error?.email && (
                      <p className="text-dark-red text-right  text-xs">
                        {error?.email}
                      </p>
                    )}
                  </Fields>
                  <div className=" grid md:grid-cols-2 gap-x-6 xs:grid-rows-2">
                    <Fields
                      type="password"
                      content="Create Password"
                      placeholder="Enter your password"
                      error={
                        error?.password || error?.confirmPassword ? true : false
                      }
                      value={password}
                      onchange={(value: string) => {
                        setPassword(value);
                        validatePassword(value);
                        setISLoading(false);
                      }}
                      onBlur={() => {
                        validatePassword(password);
                      }}
                      required
                    >
                      {error?.password && (
                        <p className="text-dark-red text-right text-xs">
                          {error?.password}
                        </p>
                      )}
                    </Fields>

                    <Fields
                      type="password"
                      content="Confirm Password"
                      placeholder="Enter your password"
                      error={error?.confirmPassword ? true : false}
                      value={conpassword}
                      onchange={(value: string) => {
                        setConpassword(value);
                        setISLoading(false);
                        validateConfirmPassword(password, value);
                      }}
                      onBlur={() => {
                        validateConfirmPassword(password, conpassword);
                      }}
                      required
                    >
                      {error?.confirmPassword && (
                        <p className="text-dark-red text-right text-xs">
                          {error?.confirmPassword}
                        </p>
                      )}
                    </Fields>
                  </div>
                  <Fields
                    type="text"
                    content="Skills"
                    placeholder="Enter comma separated skills"
                    value={skill}
                    error={error?.skills ? true : false}
                    onchange={(value: string) => {
                      setSkill(value);
                      validateSkill(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateSkill(skill);
                    }}
                    required={role == 1}
                  >
                    {error?.skills && (
                      <p className="text-dark-red text-right text-xs">
                        {error?.skills}
                      </p>
                    )}
                  </Fields>
                  <div className="flex items-center justify-center">
                    <button
                      className={`w-40  h-[46px]  bg-light-blue border border-solid border-light-blue rounded  text-[16px] font-medium flex items-center justify-center mt-8 cursor-pointer text-[#fff] ${
                        isLoading
                          ? "  bg-light-blue   text-white  cursor-no-drop  "
                          : "bg-light-blue text-white "
                      }`}
                      disabled={isLoading}
                      type="submit"
                    >
                      {loader ? <Loader /> : " Signup"}
                    </button>
                  </div>
                </form>
                <div className="text-light-dark text-center text-base mt-9 cursor-pointer">
                  <h2>
                    Have an account?{" "}
                    <span className="text-light-blue text-base font-medium ">
                      <Link href={"/login"}>Login</Link>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white-blue w-full h-[75vh]"></div>
    </>
  );
};

export default Index;
