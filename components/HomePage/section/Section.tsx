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
                src="/iconsimgs/solaytic@2x.png"
                alt=""
                className={style.section_imgs}
                width={125}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt=""
                className={style.section_imgs}
                width={144}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/lighting@2x.png"
                alt=""
                className={style.section_imgs}
                width={124}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/ztos@2x.png"
                alt=""
                className={style.section_imgs}
                width={100}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt=""
                className={style.section_imgs}
                width={144}
                height={40}
              />
            </div>

            <div className={style.section_t}>
              <Image
                src="/iconsimgs/goldline@2x.png"
                alt=""
                className={style.section_imgs}
                width={172}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/ideaa@2x.png"
                alt=""
                className={style.section_imgs}
                width={118}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/liva@2x.png"
                alt=""
                className={style.section_imgs}
                width={100}
                height={40}
              />
            </div>
            <div className={style.section_t}>
              <Image
                src="/iconsimgs/velocity-9@2x.png"
                alt=""
                className={style.section_imgs}
                width={156}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
