import React from "react";
import Cards from "./cards/Cards";
import Image from "next/image";
const Section = () => {
  return (
    <div className="bg-white-blue w-full ">
      <div className="mainWrapper">
        <div className="text-lg pt-40 md:pt-20">
          <div>
            <div className="text-[22px] text-left px-[30px] md:px-[170px]">
              <h2 className="text-light-dark font-medium ">Why Us</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 py-8 sm:px-36">
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
          <h2 className="text-[22px] mb-6 text-left px-[25px]  md:px-[170px] text-light-dark font-medium ">
            Companies Who Trust Us
          </h2>
          
          <div className="flex  flex-wrap items-center justify-center w-full px-[10px] md:px-[110px] gap-[10%]">
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/solaytic@2x.png"
                alt="solaytic"
                width={125}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt="kanaba"
                width={144}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/lighting@2x.png"
                alt="lightimg"
                width={124}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/ztos@2x.png"
                alt="ztos"
                width={100}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/kanba@2x.png"
                alt="kanba"
                width={144}
                height={40}
              />
            </div>

            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/goldline@2x.png"
                alt="goldline"
                width={172}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/ideaa@2x.png"
                alt="ideaa"
                width={118}
                height={40}
              />
            </div>
            <div className="flex items-center text-3xl mb-12 font-sans">
              <Image
                src="/iconsimgs/liva@2x.png"
                alt="Live"
                width={100}
                height={40}
              />
            </div>
            <div className="flex items-center text-4xl mb-12 font-sans">
              <Image
                src="/iconsimgs/velocity-9@2x.png"
                alt="Velocity"
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
