import "../styles/global.css";
import type { AppProps } from "next/app";
import Navbar from "../components/common/navbar/Navbar";
import ContextAPI from "../components/contextapi/ContextAPI";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextAPI>
      <div className="bg-[#1A253C]">
        <Navbar />
        {/* <hr className="w-[91%] mx-auto " /> */}
      </div>
      <Component {...pageProps} />
      <ToastContainer />
    </ContextAPI>
  );
}
