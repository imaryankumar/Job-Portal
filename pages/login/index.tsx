import style from "../login/login.module.css";
import Fields from "../../components/common/fields/Fields";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authcontext } from "../../components/contextapi/ContextAPI";
import Seo from "../../components/nexthead/Seo";
import Loader from "../../components/Loader/Loader";

interface dataType {
  success?: boolean;
  code: number;
  errors?: any;
}
const Index = () => {
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

  const justsubmit = (e: any) => {
    e.preventDefault();
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
        setISLoading(false);
      })
      .finally(() => {
        setISLoading(false);
        setLoader(false);
      });
    // const finalRes = await allData.json();
  };

  return (
    <>
      <Seo title="Login" description="This is Login page " />

      <div className={style.header}>
        <div className={style.login_card}>
          <div className={`mainWrapper`}>
            <div className={style.login_content}>
              <div className={style.login_title}>
                <h2 className={style.login_h2}>Login </h2>
              </div>

              <form
                onSubmit={(e) => justsubmit(e)}
                className={style.login_form}
              >
                <Fields
                  type="email"
                  error={error?.email ? true : false}
                  content={"Email address"}
                  placeholder="Enter your email"
                  value={mail}
                  onchange={setMail}
                  pattern={"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,4}$"}
                  required
                />
                {error ? (
                  <p className={style.login_errorpara}>{error.email}</p>
                ) : (
                  ""
                )}
                <Fields
                  type="password"
                  error={error?.password ? true : false}
                  content="Password"
                  placeholder="Enter your password"
                  password="Forgot your password?"
                  value={pass}
                  onchange={setPass}
                  required
                />
                {error ? (
                  <p className={style.login_errorpara}>{error.password}</p>
                ) : (
                  ""
                )}
                <div className={style.login_btns}>
                  <button
                    className={style.login_btn}
                    disabled={isLoading}
                    type="submit"
                    style={
                      isLoading
                        ? { backgroundColor: "white", color: "black" }
                        : { backgroundColor: "#43afff" }
                    }
                  >
                    {loader ? <Loader /> : "Login"}
                  </button>
                </div>
              </form>

              <div className={style.login_check}>
                <h2>
                  New to MyJobs?{" "}
                  <span className={style.create_account}>
                    <Link href={"/signup"}>Create an account</Link>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.login_section}></div>
    </>
  );
};

export default Index;
