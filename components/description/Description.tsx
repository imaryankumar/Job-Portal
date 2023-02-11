import React, { Children } from "react";
interface cardTypes {
  content?: string;
  placeholder?: string;
  type: string;
  value?: string;
  onchange?: any;
  onBlur?: any;
  error?: boolean;
  required?: boolean;
}
const Description = ({
  content,
  placeholder,
  type,
  value,
  onchange,
  onBlur,
  error,
  required,
}: cardTypes) => {
  return (
    <div className="w-full h-30 mb-[6px]">
      <h1 className="text-[14px] tracking-normal text-light-dark px-0 py-2 items-center justify-between ">
        {content}
        {required && <span className="star_red">*</span>}
      </h1>
      <textarea
        placeholder={placeholder}
        className={`text-black w-full h-24 outline-light-blue bg-[#e8e8e833] border border-solid border-gray-500 rounded pl-4 pt-3 opacity-40  ${
          error ? `border border-solid border-[#FF0000]` : ""
        }`}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        rows={2.5}
        onBlur={(e) => onBlur()}
        cols={55}
        maxLength={1201}
      />
    </div>
  );
};

export default Description;
