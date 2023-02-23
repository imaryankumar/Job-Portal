import React from "react";
import Loader from "../../Loader/Loader";
interface ButtonType {
  isLoading: boolean;
  loader: boolean;
  type: any;
  name: string;
}

const Buttons = ({ isLoading, loader, type, name }: ButtonType) => {
  return (
    <>
      <button
        className={`w-40 h-[46px]  bg-light-blue border border-solid border-light-blue rounded  text-[16px] font-medium flex items-center justify-center cursor-pointer text-white ${
          isLoading
            ? "  bg-light-blue   text-white  cursor-no-drop  "
            : "bg-light-blue text-white "
        }`}
        disabled={isLoading}
        type={type}
      >
        {loader ? <Loader /> : name}
      </button>
    </>
  );
};

export default Buttons;
