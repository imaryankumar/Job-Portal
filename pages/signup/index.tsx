import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import style from "../signup/Signup.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
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
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(false);

  interface dataType {
    success?: boolean;
    code: number;
    errors?: any[];
  }

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
    const body = {
      email: mail,
      userRole: role,
      password: password,
      confirmPassword: conpassword,
      name: name,
      skills: skill,
    };
    // console.log("🚀 ~ file: index.tsx:50 ~ Justclick ~ body", body);
    if (password === conpassword) {
      const res = await fetch(
        "https://jobs-api.squareboat.info/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const finalRes = await res.json();
      if (finalRes.success) {
        setData(finalRes);
        setName("");
        setMail("");
        setPassword("");
        setConpassword("");
        setSkill("");
        setError(false);
        toast.success("Signup  Successfull");
        Router.push("/login");
      } else {
        setISLoading(true);
        setError(true);
        toast.error("Signup Failed");
      }
    } else {
      setISLoading(true);
      setError(true);
      toast.error("Signup Failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={style.signup_header}>
        <div className={style.signup_card}>
          <div className={style.signup_content}>
            <h1 className={style.signup_h1}>Signup</h1>
            <h3 className={style.signup_h3}>I’m a*</h3>
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
                  content="Full Name*"
                  placeholder="Enter your full name"
                  error={error ? true : false}
                  value={name}
                  onchange={setName}
                />
                {error ? (
                  <p className={style.signup_errorpara}>
                    The field is mandatory.
                  </p>
                ) : (
                  ""
                )}
                <Fields
                  type="email"
                  content="Email Address*"
                  placeholder="Enter your email"
                  error={error ? true : false}
                  value={mail}
                  onchange={setMail}
                  pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                />
                {error ? (
                  <p className={style.signup_errorpara}>
                    The field is mandatory.
                  </p>
                ) : (
                  ""
                )}
                <div className={style.signup_password}>
                  <Fields
                    type="password"
                    content="Create Password*"
                    placeholder="Enter your password"
                    error={error ? true : false}
                    value={password}
                    onchange={setPassword}
                  />

                  <Fields
                    type="password"
                    content="Confirm Password*"
                    placeholder="Enter your password"
                    error={error ? true : false}
                    value={conpassword}
                    onchange={setConpassword}
                  />
                </div>
                {error ? (
                  <p className={style.signup_errorpara}>
                    The field is mandatory.
                  </p>
                ) : (
                  ""
                )}
                <Fields
                  type="text"
                  content="Skills"
                  placeholder="Enter comma separated skills"
                  value={skill}
                  onchange={setSkill}
                />
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
                    Signup
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
      <div className={style.signup_section}></div>
    </>
  );
};

export default Index;
