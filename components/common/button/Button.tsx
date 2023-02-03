import React from "react";
interface cardTypes {
  data?: string;
}
const Button = ({ data }: cardTypes) => {
  return (
    <button className="w-40 h-[46px] bg-blue-400 border border-solid border-blue-400 rounded  flex items-center justify-center mt-8 cursor-pointer ">
      <h2 className="text-[#fff] ">{data}</h2>
    </button>
  );
};

export default Button;
