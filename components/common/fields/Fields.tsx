import React from "react";
import style from "../fields/Fields.module.css";
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
    <div className={style.field_content}>
      <h2 className={style.field_h2}>
        {content}
        {required && <span className="star_red">*</span>}
        <span className={style.forget_password}>
          <Link href={"/forgotpassword"}>{password}</Link>
        </span>
      </h2>
      <input
        type={type}
        placeholder={placeholder}
        className={`${style.field_input} ${
          error ? `${style.input_Fields}` : ""
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
