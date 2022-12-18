import React from "react";
import style from "../cards/Cards.module.css";
interface cardTypes {
  name?: string;
  para?: string;
  paraspam?: string;
}
const Cards = ({ name, para, paraspam }: cardTypes) => {
  return (
    <div className={style.card}>
      <h1 className={`${style.card_h1} ${style.line_clamp}`}>
        {name}
        <br />
        {paraspam}
      </h1>
      <p className={`${style.card_p} ${style.line_clamp}`}>{para}</p>
    </div>
  );
};

export default Cards;
