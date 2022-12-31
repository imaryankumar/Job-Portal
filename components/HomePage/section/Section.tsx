import React from "react";
import Cards from "./cards/Cards";
import style from "../section/Section.module.css";
import Image from "next/image";
const Section = () => {
  return (
    <div className="bg-[#edf6ff] w-full h-auto">
      <div className="mainWrapper">
        <div className="text-lg pt-20">
          <div>
            <div className="text-xl px-44">
              <h2>Why Us</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 py-8 px-36">
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
        <div>
          <h1 className="text-xl mb-6 text-left px-40">
            Companies Who Trust Us
          </h1>
          {/* <div className={style.section_img}> */}
          <div className="flex  flex-wrap items-center justify-center w-full px-32 gap-[10%]">
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/solaytic@2x.png"
                alt=""
                width={125}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt=""
                width={144}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/lighting@2x.png"
                alt=""
                width={124}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/ztos@2x.png"
                alt=""
                width={100}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt=""
                width={144}
                height={40}
              />
            </div>

            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/goldline@2x.png"
                alt=""
                width={172}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/ideaa@2x.png"
                alt=""
                width={118}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/liva@2x.png"
                alt=""
                width={100}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/velocity-9@2x.png"
                alt=""
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
