import React from "react";
import style from "../description/Description.module.css";
interface cardTypes {
  content?: string;
  placeholder?: string;
  type: string;
  value?: string;
  onchange?: any;
  error?: boolean;
}
const Description = ({
  content,
  placeholder,
  type,
  value,
  onchange,
  error,
}: cardTypes) => {
  return (
    <div className={style.description_content}>
      <h2 className={style.description_h2}>{content}</h2>
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
