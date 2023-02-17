import React, { Children } from "react";
import { DescCardTypes } from "../../utils/types";
const Description = ({
  content,
  placeholder,
  type,
  value,
  onchange,
  onBlur,
  error,
  required,
}: DescCardTypes) => {
  return (
    <div className="w-full h-30 mb-[6px]">
      <h1 className="text-[14px] tracking-normal text-light-dark px-0 py-2 items-center justify-between ">
        {content}
        {required && <span className="Required_field">*</span>}
      </h1>
      <textarea
        placeholder={placeholder}
        className={` w-full h-24 outline-[#43AFFF] bg-[#E8E8E833] border border-solid border-[#C6C6C6] rounded pl-4 pt-4   ${
          error ? `border border-solid border-[#FF0000]` : ""
        }`}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        rows={2.5}
        onBlur={(e) => onBlur()}
        cols={55}
        maxLength={1200}
      />
    </div>
  );
};

export default Description;
