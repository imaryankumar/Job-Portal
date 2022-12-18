import style from "../login/login.module.css";
import Fields from "../../components/common/fields/Fields";
import Link from "next/link";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authcontext } from "../../components/contextapi/ContextAPI";

interface dataType {
  success?: boolean;
  code: number;
  errors?: any[];
}
const index = () => {
  const myData = useContext(authcontext);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState<dataType | undefined>(undefined);

  const onsubmit = async () => {
    const body = {
      email: mail,
      password: pass,
    };

    const d = await fetch(
      "https://jobs-api.squareboat.info/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const finalRes = await d.json();
    console.log({ finalRes });
    setData(finalRes);
    finalRes.success && toast.success("Logged in");
    finalRes.errors && toast.error("Login Failed");
    // myData.setLoggin(finalRes.data);
  };

  return (
    <>
      <ToastContainer />
      <div className={style.header}>
        <div className={style.login_card}>
          <div className={style.login_content}>
            <div className={style.login_title}>
              <h2 className={style.login_h2}>Login </h2>
            </div>

            <form onSubmit={() => onsubmit()} className={style.login_form}>
              <Fields
                type="email"
                error={data?.success === false ? true : false}
                content="Email address"
                placeholder="Enter your email"
                value={mail}
                onchange={setMail}
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
              />
              {data?.success === true ? "" : ""}
              <Fields
                type="password"
                error={data?.success === false ? true : false}
                content="Password"
                placeholder="Enter your password"
                password="Forgot your password?"
                value={pass}
                onchange={setPass}
              />
              {data?.success === false ? (
                <p className={style.login_errorpara}>
                  Incorrect email address or password.
                </p>
              ) : (
                ""
              )}
              <div className={style.login_btns}>
                <button className={style.login_btn} type="submit">
                  Login
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
      <div className={style.login_section}></div>
    </>
  );
};

export default index;