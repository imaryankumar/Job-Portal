import React from "react";
import style from "../description/Description.module.css";
interface cardTypes {
  content?: string;
  placeholder?: string;
  type: string;
  value?: string;
  onchange?: any;
  error?: boolean;
  required?: boolean;
}
const Description = ({
  content,
  placeholder,
  type,
  value,
  onchange,
  error,
  required,
}: cardTypes) => {
  return (
    <div className={style.description_content}>
      <h2 className={style.description_h2}>
        {content}
        {required && <span className="star_red">*</span>}
      </h2>
      <textarea
        placeholder={placeholder}
        className={`${style.description_input} ${
          error ? `${style.description_Fields}` : ""
        }`}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        rows={2.5}
        cols={55}
      />
    </div>
  );
};

export default Description;
