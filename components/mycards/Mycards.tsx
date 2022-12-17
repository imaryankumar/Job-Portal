import { useEffect, useState } from "react";
import style from "../mycards/mycards.module.css";
interface cardTypes {
  content?: string;
  location?: string;
  title?: string;
  description?: string;
}

const Mycards = ({ content, location }: cardTypes) => {
  return (
    <>
      <div className={style.mycard}>
        {myData?.map((item: cardTypes, key) => {
          return (
            <>
              <div className={style.mycard_heading}>
                <h1>{item.title}</h1>
              </div>
              <div className={style.mycard_para}>
                <p>{item.description}</p>
              </div>
              <div className={style.mycard_locsection}>
                <div className={style.mycard_locationcard}>
                  <img src="iconsimgs/mypin.png" alt="" />
                  <h3 className={style.mycard_h3}>{item.location}</h3>
                </div>
                <div>
                  <button className={style.mycard_btn}>
                    View applications
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Mycards;
