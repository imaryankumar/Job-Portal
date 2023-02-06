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
  children?: any;
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
  children,
}: cardTypes) => {
  return (
    <div className="w-full h-[95px] ">
      <div className="text-[#303f60]  px-0 py-2 text-[14px] flex items-center justify-between ">
        <div className="">
          {content}
          {required && <span className="star_red">*</span>}
        </div>

        <Link href={"/forgotpassword"} className="text-[#43AFFF]">
          {password}
        </Link>
      </div>
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
      {children}
    </div>
  );
};

export default Fields;
