import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="grid place-items-center ">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#43AFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
