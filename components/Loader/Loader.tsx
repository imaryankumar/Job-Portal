import React from "react";
import style from "../Loader/Loader.module.css";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={style.mainLoader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
