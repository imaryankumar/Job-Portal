import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
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

  function validateName(name: string) {
    if (!name.trim()) {
      setErrorState("name", "Name is required");
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
    if (conpassword !== password) {
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
    } else {
      setErrorState("skills", false);
      return false;
    }
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
          setLoader(false);
        })
        .finally(() => {
          setISLoading(false);
          setLoader(false);
        });
    }
  };

  // console.log("button", btn2 ? "a" : "b");
  // console.log("button", btn ? "aa" : "bb");

  return (
    <>
      <Seo title="Signup" />
      <div className="bg-[#303f60] w-full h-[40vh] text-white flex items-center justify-center">
        <div className="mainWrapper">
          <div className="w-[557px] h-auto bg-[#ffffff] box-shadows rounded-[20px] mt-[32rem] flex flex-col items-center text-[#303f60]">
            <div className="w-full py-0 px-10">
              <h1 className="text-[22px] text-[#303f60] py-6 px-0">Signup</h1>
              <h2 className="pb-2 text-[14px]">
                I’m a<span className="star_red">*</span>
              </h2>
              <div className="flex">
                <button
                  type="button"
                  className={`w-[148px] h-[46px] bg-[#e8e8e833] text-black border border-solid border-[#c6c6c6] rounded-[5px] cursor-pointer text-[14px] flex items-center justify-evenly mr-6 ${
                    btn && "BtnTrue"
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
                  className={`w-[148px] h-[46px] bg-[#e8e8e833] text-black border border-solid border-[#c6c6c6] rounded-[5px] cursor-pointer text-[14px] flex items-center justify-evenly mr-6 ${
                    btn2 && "BtnTrue"
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
              <div className="my-4 mx-0">
                <form onSubmit={(e) => Justclick(e)}>
                  <Fields
                    type="text"
                    content="Full Name"
                    placeholder="Enter your full name"
                    error={error?.name ? true : false}
                    value={name}
                    onchange={(value: string) => {
                      setName(value);
                      validateName(value);
                    }}
                    onBlur={() => {
                      validateName(name);
                    }}
                    required
                  />

                  {error?.name && (
                    <p className="text-red-500 text-right mt-[-15px] text-[12px]">
                      {error.name}
                    </p>
                  )}
                  <Fields
                    type="text"
                    content="Email Address"
                    placeholder="Enter your email"
                    error={error?.email ? true : false}
                    value={mail}
                    onchange={(value: string) => {
                      setMail(value);
                      validateEmail(value);
                    }}
                    onBlur={() => {
                      validateEmail(mail);
                    }}
                    pattern={"^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$"}
                    required
                  />
                  {error?.email && (
                    <p className="text-red-500 text-right mt-[-15px] text-[12px]">
                      {error?.email}
                    </p>
                  )}

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
                    }}
                    onBlur={() => {
                      validatePassword(password);
                    }}
                    required
                  />
                  {error?.password && (
                    <p className="text-red-500 text-right mt-[-15px] text-[12px]">
                      {error?.password}
                    </p>
                  )}

                  <Fields
                    type="password"
                    content="Confirm Password"
                    placeholder="Enter your password"
                    error={error?.confirmPassword ? true : false}
                    value={conpassword}
                    onchange={(value: string) => {
                      setConpassword(value);
                      validateConfirmPassword(password, value);
                    }}
                    onBlur={() => {
                      validateConfirmPassword(password, conpassword);
                    }}
                    required
                  />
                  {error?.confirmPassword && (
                    <p className="text-red-500 text-right mt-[-15px] text-[12px]">
                      {error?.confirmPassword}
                    </p>
                  )}

                  <Fields
                    type="text"
                    content="Skills"
                    placeholder="Enter comma separated skills"
                    value={skill}
                    error={error?.skills ? true : false}
                    onchange={(value: string) => {
                      setSkill(value);
                      validateSkill(value);
                    }}
                    onBlur={() => {
                      validateSkill(skill);
                    }}
                    required={role == 1}
                  />
                  {error?.skills && (
                    <p className="text-red-500 text-right mt-[-15px] text-[12px]">
                      {error?.skills}
                    </p>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      className="w-[148px] h-[46px] bg-[#43afff] border-[#43afff] rounded-[5px] opacity-100 flex items-center justify-center mt-8 cursor-pointer text-[#fff]"
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
                <div className="text-[#303f60] text-center mt-9 cursor-pointer">
                  <h2>
                    Have an account?{" "}
                    <span className="text-[#43afff] text-[16px]">
                      <Link href={"/login"}>Login</Link>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#edf6ff] w-full h-[75vh]"></div>
    </>
  );
};

export default Index;
