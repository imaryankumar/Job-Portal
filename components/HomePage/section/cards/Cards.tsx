import React from "react";

interface cardTypes {
  name?: string;
  para?: string;
  paraspam?: string;
}
const Cards = ({ name, para, paraspam }: cardTypes) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex flex-col flex-wrap m-6">
      <h1 className="text-[#43afff] pb-4 font-normal text-2xl ">
        {name}
        <br />
        {paraspam}
      </h1>
      <p className="text-[#303f60] text-sm">{para}</p>
    </div>
  );
};

export default Cards;
