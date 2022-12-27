import React from "react";
import Cards from "./cards/Cards";
import style from "../section/Section.module.css";
import Image from "next/image";
const Section = () => {
  return (
    <div className={`${style.section}`}>
      <div className={`mainWrapper`}>
        <div className={`${style.section_txts}`}>
          <div className={style.section_head_txts}>
            <div className={style.section_h2}>
              <h2>Why Us</h2>
            </div>
            <div className={style.section_cards}>
              <Cards
                name="Get More"
                para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel eaque, a cupiditate?"
                paraspam="Visibility"
              />
              <Cards
                name="Organize Your"
                para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel "
                paraspam="Candidates"
              />
              <Cards
                name="Verify Their"
                para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel eaque"
                paraspam="Abilities"
              />
            </div>
          </div>
        </div>
        <div className={style.section_content}>
          <h1 className={style.section_h1}>Companies Who Trust Us</h1>
          <div className={style.section_img}>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/apple.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>Solyatic</h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/billing.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>Kanba</h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/larevel.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>
                Light<span className={style.section_span}>AI</span>
              </h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/chips.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>Ztos</h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/rotate.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>Direction</h3>
            </div>

            <div className={style.section_t}>
              <Image
                src="/iconsimgs/code.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>goldline</h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/curlyarrow.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>ideaa</h3>
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/time.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
              <h3>liva</h3>
            </div>
            <div className={style.section_t}>
              <h3>Velocity</h3>
              <Image
                src="/iconsimgs/water.png"
                alt=""
                className={style.section_imgs}
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
