import "../styles/global.css";
import type { AppProps } from "next/app";
import Navbar from "../components/common/navbar/Navbar";
import ContextAPI from "../components/contextapi/ContextAPI";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextAPI>
      <div className="bg-[#303F60]">
        <Navbar />
        {/* <hr className="w-[91%] mx-auto " /> */}
      </div>
      <Component {...pageProps} />
    </ContextAPI>
  );
}
