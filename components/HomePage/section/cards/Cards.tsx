import React from "react";

interface cardTypes {
  name?: string;
  para?: string;
  paraspam?: string;
}
const Cards = ({ name, para, paraspam }: cardTypes) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex flex-col flex-wrap m-4 md:m-6">
      <h2 className="text-light-blue pb-4 font-medium text-[22px] ">
        {name}
        <br />
        {paraspam}
      </h2>
      <p className="text-light-dark text-sm">{para}</p>
    </div>
  );
};

export default Cards;
