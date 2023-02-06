import React from "react";
interface cardTypes {
  data?: string;
}
const Button = ({ data }: cardTypes) => {
  return (
    <button className="w-40 h-[46px] bg-light-blue border border-solid border-light-blue rounded  flex items-center justify-center mt-8 cursor-pointer ">
      <h1 className="text-[#fff] ">{data}</h1>
    </button>
  );
};

export default Button;
