import React from "react";
import Cards from "./cards/Cards";
import SectionImg from "../SectionImg";
import ImageArray from "../section/ImageArray.json";

const Section = () => {
  const data = [
    {
      name: "Get More",
      para: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel eaque, a cupiditate?",
      paraspam: "Visibility",
    },
    {
      name: "Organize Your",
      para: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel ",
      paraspam: "Candidates",
    },
    {
      name: "Verify Their",
      para: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aspernatur tempore vel eaque",
      paraspam: "Abilities",
    },
  ];

  return (
    <div className="bg-white-blue w-full ">
      <div className="mainWrapper">
        <div className="text-lg pt-40 md:pt-20">
          <div>
            <div className="text-[22px] text-left px-[18px] md:px-[170px]">
              <h2 className="text-light-dark font-medium ">Why Us</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 py-3 md:py-8 sm:px-36  ">
              {data.map((item, key) => {
                return (
                  <>
                    <Cards
                      key={key}
                      name={item.name}
                      para={item.para}
                      paraspam={item.paraspam}
                    />
                  </>
                );
              })}
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
