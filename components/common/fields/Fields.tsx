import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FieldCardTypes } from "../../../utils/types";

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
}: FieldCardTypes) => {
  const router = useRouter();

  return (
    <div className="w-full h-[95px] xs:h-[85px] ">
      <div className="text-light-dark px-0 py-2 text-[14px] flex items-center justify-between ">
        <div className="">
          {content}
          {required && <span className="Required_field">*</span>}
        </div>
        {router.pathname.includes("login") ? (
          <Link
            href={"/forgot-password"}
            className="text-light-blue font-medium text-[14px] "
          >
            {password}
          </Link>
        ) : (
          ""
        )}
      </div>
      <input
        autoComplete={`${
          router.pathname.includes("login") ? "off" : "new-password"
        }`}
        type={type}
        placeholder={placeholder}
        className={` w-full h-[40px] xs:h-[38px] md:h-[46px] outline-light-blue bg-[#E8E8E833] border border-solid border-[#C6C6C6] rounded pl-4  ${
          error ? "border border-solid border-dark-red" : ""
        }`}
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onchange((e.target as HTMLInputElement).value)
        }
        onBlur={(e) => onBlur()}
        pattern={pattern}
        maxLength={100}
      />
      {children}
    </div>
  );
};

export default Fields;
