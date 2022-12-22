import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import style from "../signup/Signup.module.css";
import { useState } from "react";
// import { getEnvironmentData } from "worker_threads";
const index = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [role, setRole] = useState(0);
  const [btn, setBtn] = useState(true);
  const [btn2, setBtn2] = useState(false);
  const [skill, setSkill] = useState("");

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
    if (password === conpassword) {
      const finalRes = await res.json();
      setData(finalRes);
      setName("");
      setMail("");
      setPassword("");
      setConpassword("");
      setSkill("");
    } else {
      alert("Error");
    }
  };

  return (
    <>
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
                <img
                  src="iconsimgs/Recruiter.png"
                  alt=""
                  style={{ width: "25px", height: "25px" }}
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
                <img
                  src="iconsimgs/candidate.png"
                  alt=""
                  style={{ width: "25px", height: "25px" }}
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
                  error={data?.success === false ? true : false}
                  value={name}
                  onchange={setName}
                />
                {data?.success === false ? (
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
                  error={data?.success === false ? true : false}
                  value={mail}
                  onchange={setMail}
                  pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                />
                {data?.success === false ? (
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
                    error={data?.success === false ? true : false}
                    value={password}
                    onchange={setPassword}
                  />

                  <Fields
                    type="password"
                    content="Confirm Password*"
                    placeholder="Enter your password"
                    error={data?.success === false ? true : false}
                    value={conpassword}
                    onchange={setConpassword}
                  />
                </div>
                {data?.success === false ? (
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
                  <button className={style.signup_onclick}>Signup</button>
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

export default index;
