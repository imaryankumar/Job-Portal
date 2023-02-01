import React from "react";
import Link from "next/link";
interface cardTypes {
  content?: string;
  placeholder?: string;
  password?: string;
  type: string;
  value?: string;
  onchange?: any;
  onBlur?: any;
  pattern?: any;
  error?: boolean;
  required?: boolean;
}
const Fields = ({
  content,
  placeholder,
  password,
  type,
  value,
  onchange,
  onBlur,
  pattern,
  error,
  required,
}: cardTypes) => {
  return (
    <div className="w-full h-[95px] ">
      <h2 className="text-[#303f60] opacity-100 px-0 py-2 text-[14px] items-center justify-between ">
        {content}
        {required && <span className="star_red">*</span>}
        <span className="text-[#43afff] text-[14px] cursor-pointer  pl-[9.5rem] xs:pl-[2.5rem] md:pl-[21rem] ">
          <Link href={"/forgotpassword"}>{password}</Link>
        </span>
      </h2>
      <input
        type={type}
        placeholder={placeholder}
        className={`text-black w-full h-[40px] xs:h-[38px] md:h-[46px] outline-[#43afff] bg-[#e8e8e833] border border-solid border-gray-500 rounded pl-2 ${
          error ? "border border-solid border-red-500" : ""
        }`}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        onBlur={(e) => onBlur()}
        pattern={pattern}
        maxLength={255}
      />
    </div>
  );
};

export default Fields;
