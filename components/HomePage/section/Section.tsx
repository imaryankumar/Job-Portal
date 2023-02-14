import React from "react";
import Cards from "./cards/Cards";
import Image from "next/image";
import SectionImg from "../SectionImg";

const ImageArray = [
  { id: 1, src: "/iconsimgs/solaytic@2x.png", alt: "solaytic icon" },
  { id: 2, src: "/iconsimgs/kanba@2x.png", alt: "kanaba icon" },
  { id: 3, src: "/iconsimgs/lighting@2x.png", alt: "lighting icon" },
  { id: 4, src: "/iconsimgs/ztos@2x.png", alt: "ztos icon" },
  { id: 5, src: "/iconsimgs/kanba@2x.png", alt: "kanba icon" },
  { id: 6, src: "/iconsimgs/goldline@2x.png", alt: "goldline icon" },
  { id: 7, src: "/iconsimgs/ideaa@2x.png", alt: "ideaa icon" },
  { id: 8, src: "/iconsimgs/liva@2x.png", alt: "liva icon" },
  { id: 9, src: "/iconsimgs/velocity-9@2x.png", alt: "velocity icon" },
];

const Section = () => {
  return (
    <div className="bg-white-blue w-full ">
      <div className="mainWrapper">
        <div className="text-lg pt-40 md:pt-20">
          <div>
            <div className="text-[22px] text-left px-[18px] md:px-[170px]">
              <h2 className="text-light-dark font-medium ">Why Us</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 py-3 md:py-8 sm:px-36  ">
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
          <h2 className="text-[22px] mb-6 text-left px-[18px]  md:px-[170px] text-light-dark font-medium  my-4">
            Companies Who Trust Us
          </h2>
          <div className="flex  flex-wrap  md:justify-center items-center w-[90%] md:w-[80%] gap-x-2 md:gap-x-20 md:gap-y-10 mx-auto justify-between mb-16">
            {ImageArray.length > 0 &&
              ImageArray.map((d) => {
                return <SectionImg src={d.src} alt={d.alt} key={d.id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
