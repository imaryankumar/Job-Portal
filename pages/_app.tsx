import "../styles/global.css";
import type { AppProps } from "next/app";
import Navbar from "../components/common/navbar/Navbar";
import ContextAPI from "../components/contextapi/ContextAPI";
import { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isHidd = useMemo(() => {
    if (router.pathname === "/404") {
      return true;
    } else {
      return false;
    }
  }, [router]);

  return (
    <ContextAPI>
      <div className="bg-dark-blue">{!isHidd && <Navbar />}</div>

      <Component {...pageProps} />
      <ToastContainer className="toast-contt xl:!mr-30  2xl:!mr-[17rem] text-[15px] " />
    </ContextAPI>
  );
}
