import React from 'react'
import style from '../button/Button.module.css'
interface cardTypes{
    data?:string;
  
  }
const Button = ({data}:cardTypes) => {
  return (
    <button className={style.button_field }>
      <h2 className={style.button_h2}>{data}</h2>
    </button>
  )
}

export default Button
