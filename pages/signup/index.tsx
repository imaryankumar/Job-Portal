import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import style from "../signup/Signup.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import Router from "next/router";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import { userAgent } from "next/server";
// import { getEnvironmentData } from "worker_threads";
const Index = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [role, setRole] = useState(0);
  const [btn, setBtn] = useState(true);
  const [btn2, setBtn2] = useState(false);
  const [skill, setSkill] = useState("");
  const [loader, setLoader] = useState(false);
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
    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let skillsError = false;

    if (!name.trim()) {
      setErrorState("name", "Name is required");
      nameError = true;
    } else {
      let re = /^[a-zA-Z]+$/;
      if (re.test(name)) {
      } else {
        setErrorState("name", false);
        nameError = false;
      }
    }

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

    if (!password) {
      setErrorState("password", "Password is required");
      passwordError = true;
    } else {
      if (password.length < 6) {
        setErrorState("password", "Password should be min 6 characters");
        passwordError = true;
      } else {
        setErrorState("password", false);
        passwordError = false;
      }
    }

    if (conpassword !== password) {
      setErrorState("confirmPassword", "Passwords do not match");
      confirmPasswordError = true;
    } else {
      setErrorState("confirmPassword", false);
      confirmPasswordError = false;
    }

    if (Number(role) === 1 && !skill.trim()) {
      setErrorState("skills", "Skills is required");
      skillsError = true;
    } else {
      setErrorState("skills", false);
      skillsError = false;
    }

    return (
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      skillsError
    );
  };
  const [data, setData] = useState<dataType | undefined>(undefined);

  //  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  function mybtn1() {
    setRole(0);
    setBtn(true);
    setBtn2(false);
  }
  function mybtn2() {
    setRole(1);
    setBtn2(true);
    setBtn(false);
  }

  // console.log({ btn, btn2 });

  const Justclick = async (e: any) => {
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
            // setError(true);
            toast.success(finalRes.message);
            Router.push("/login");
          } else {
            setError({});
            // setError(true);
            if (finalRes?.message) {
              toast.error(finalRes.message);
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
          setISLoading(false);
        })
        .finally(() => {
          setISLoading(false);
          setLoader(false);
        });
    }
  };

  return (
    <>
      <Seo title="Signup" />
      <div className={style.signup_header}>
        <div className="mainWrapper">
          <div className={style.signup_card}>
            <div className={style.signup_content}>
              <h1 className={style.signup_h1}>Signup</h1>
              <h2 className={style.signup_h2}>
                I’m a<span className="star_red">*</span>
              </h2>
              <div className={style.signup_onchange}>
                <button
                  type="button"
                  className={`${style.signup_btnchange} ${
                    btn ? style.btnTrue : style.btnFalse
                  }`}
                  onClick={() => mybtn1()}
                >
                  <Image
                    src="/iconsimgs/Recruiter.png"
                    alt=""
                    width={25}
                    height={25}
                  />
                  Recruiter
                </button>
                <button
                  type="button"
                  className={`${style.signup_btnchange} ${
                    btn2 ? style.btnTrue : style.btnFalse
                  }`}
                  onClick={() => mybtn2()}
                >
                  <Image
                    src="/iconsimgs/candidate.png"
                    alt=""
                    width={25}
                    height={25}
                  />
                  Candidate
                </button>
              </div>
              <div className={style.signup_fields}>
                <form onSubmit={(e) => Justclick(e)}>
                  <Fields
                    type="text"
                    content="Full Name"
                    placeholder="Enter your full name"
                    error={error?.name ? true : false}
                    value={name}
                    onchange={setName}
                    required
                  />

                  {error?.name && (
                    <p className={style.signup_errorpara}>{error.name}</p>
                  )}
                  <Fields
                    type="tex"
                    content="Email Address"
                    placeholder="Enter your email"
                    error={error?.email ? true : false}
                    value={mail}
                    onchange={setMail}
                    pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                    required
                  />
                  {error?.email && (
                    <p className={style.signup_errorpara}>{error?.email}</p>
                  )}

                  <Fields
                    type="password"
                    content="Create Password"
                    placeholder="Enter your password"
                    error={
                      error?.password || error?.confirmPassword ? true : false
                    }
                    value={password}
                    onchange={setPassword}
                    required
                  />
                  {error?.password && (
                    <p className={style.signup_errorpara}>{error?.password}</p>
                  )}

                  <Fields
                    type="password"
                    content="Confirm Password"
                    placeholder="Enter your password"
                    error={error?.confirmPassword ? true : false}
                    value={conpassword}
                    onchange={setConpassword}
                    required
                  />
                  {error?.confirmPassword && (
                    <p className={style.signup_errorpara}>
                      {error?.confirmPassword}
                    </p>
                  )}

                  <Fields
                    type="text"
                    content="Skills"
                    placeholder="Enter comma separated skills"
                    value={skill}
                    error={error?.skills ? true : false}
                    onchange={setSkill}
                    required={role == 1}
                  />
                  {error?.skills && (
                    <p className={style.signup_errorpara}>{error?.skills}</p>
                  )}
                  <div className={style.signup_btns}>
                    <button
                      className={style.signup_onclick}
                      disabled={isLoading}
                      type="submit"
                      style={
                        isLoading
                          ? { backgroundColor: "white", color: "black" }
                          : { backgroundColor: "#43afff" }
                      }
                    >
                      {loader ? <Loader /> : " Signup"}
                    </button>
                  </div>
                </form>
                <div className={style.signup_check}>
                  <h2>
                    Have an account?{" "}
                    <span className={style.signup_account}>
                      <Link href={"/login"}>Login</Link>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.signup_section}></div>
    </>
  );
};

export default Index;
