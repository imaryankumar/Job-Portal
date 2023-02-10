import Fields from "../../components/common/fields/Fields";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authcontext } from "../../components/contextapi/ContextAPI";
import Seo from "../../components/nexthead/Seo";
import Loader from "../../components/Loader/Loader";
import { useRouter } from "next/router";
interface dataType {
  success?: boolean;
  code: number;
  errors?: any;
}
const Index = () => {
  const router = useRouter();
  const myData = useContext(authcontext);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<{
    password?: string;
    email?: string;
  }>();
  const [isLoading, setISLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<dataType | undefined>(undefined);

  // const formFields=[mail, pass];
  // const mydata=formFields.some(value=>value.length!==0)
  // if(mydata===true){

  // }

  const validateEmail = (email: string) => {
    let re = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };
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
  function validatePass(pass: string) {
    if (!pass) {
      setErrorState("password", "Password is required");
      return true;
    } else {
      if (pass.length < 6) {
        setErrorState("password", "Password should be min 6 characters");
        return true;
      } else {
        setErrorState("password", false);
        return false;
      }
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (mail && pass) {
     
      }
    });
  }, []);

  const validateForm = async () => {
    let emailError = false;
    let passwordError = false;

    emailError = validateMail(mail);
    passwordError = validatePass(pass);

    return emailError || passwordError;
  };
  const justsubmit = async (e: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      const body = {
        email: mail,
        password: pass,
      };
      setISLoading(true);
      setLoader(true);
      fetch("https://jobs-api.squareboat.info/api/v1/auth/login", {
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
          setISLoading(false);
          if (finalRes.success) {
            setISLoading(true);
            toast.success("You have successfully logged in");
            setData(finalRes);
          // console.log({finalRes});
            myData.setLoggin(finalRes.data);
          } else {
            setISLoading(true);
            setError({});
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
          toast.error("Login Failed");
          setISLoading(true);
        })
        .finally(() => {
          setISLoading(true);
          setLoader(false);
        });
    }
    // const finalRes = await allData.json();
  };

  return (
    <>
      <Seo title="Login" description="This is Login page " />

      <div className="bg-dark-blue w-full h-[38vh] 2xl:h-[15vh] text-white flex items-center justify-center absolute ">
        <div className="bg-white box-shadows rounded-2xl relative mt-[15rem] md:mt-[19rem]  2xl:mt-[20rem] flex flex-col items-center justify-center py-6 px-5">
          <div className={`mainWrapper`}>
            <div>
              <div className="py-0 px-0">
                <h1 className="text-light-dark text-2xl tracking-normal font-medium ">
                  Login{" "}
                </h1>
              </div>
              <form
                onSubmit={(e) => justsubmit(e)}
                className=" w-[370px] xs:w-[260px]  md:w-[557px]"
              >
                <Fields
                  type="email"
                  error={error?.email ? true : false}
                  content={"Email address"}
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
                  required
                >
                  {error ? (
                    <p className="text-[#FF0000] text-right  text-xs">
                      {error.email}
                    </p>
                  ) : (
                    <p className="h-2"></p>
                  )}
                </Fields>
                <Fields
                  type="password"
                  error={error?.password ? true : false}
                  content="Password"
                  placeholder="Enter your password"
                  password="Forgot your password?"
                  value={pass}
                  onchange={(value: string) => {
                    setPass(value);
                    validatePass(value);
                    setISLoading(false);
                  }}
                  onBlur={() => {
                    validatePass(pass);
                  }}
                  required
                >
                  {error ? (
                    <p className="text-[#FF0000] text-right  text-xs">
                      {error.password}
                    </p>
                  ) : (
                    <p className="h-2"></p>
                  )}
                </Fields>
                <div className="flex items-center justify-center  ">
                  <button
                    className="w-40 h-[46px] bg-light-blue border border-solid border-light-blue text-[16px] font-medium  rounded-md  flex items-center justify-center mt-8 xs:mt-6 cursor-pointer text-white"
                    disabled={isLoading}
                    type="submit"
                    style={
                      isLoading
                        ? { backgroundColor: "#43AFFF", color: "white",cursor:"no-drop" }
                        : { backgroundColor: "#43AFFF" ,color:"white"}
                    }
                  >
                    {loader ? <Loader /> : "Login"}
                  </button>
                </div>
              </form>

              <div className="text-light-dark text-center mt-10 xs:mt-6  cursor-pointer">
                <h2 className="text-base " >
                  New to MyJobs?{" "}
                  <span className="text-light-blue text-base font-medium ">
                    <Link href={"/sign-up"}>Create an account</Link>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white-blue w-full h-[70vh]"></div>
    </>
  );
};

export default Index;
