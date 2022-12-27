import React from "react";
import style from "../Loader/Loader.module.css";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={style.mainLoader}>
      <Rings />
    </div>
  );
};

export default Loader;
