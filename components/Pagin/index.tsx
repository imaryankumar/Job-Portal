import Image from "next/image";
import { cardTypes } from "../../utils/types";

const Pagination = ({ data, pagination, children }: any) => {
  return (
    <div className="z-0 flex flex-wrap gap-[2%] mainWrapper justify-center md:justify-start md:px-40 xs:px-1 px-8   ">
      {data
        ?.slice(pagination.start, pagination.end)
        .map((item: cardTypes, key: number) => {
          return (
            <div
              className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[23%] h-[180px] bg-white rounded mb-4 px-4 py-4 relative capitalize shadow "
              key={key}
            >
              <div
                className={`text-[17px] text-light-dark tracking-normal line-clamps `}
                key={key}
                title={item.title}
                data-toggle="tooltip"
              >
                <h1>{item.title}</h1>
              </div>
              <div
                className={` text-[14px] tracking-normal text-light-dark opacity-80 mx-0 my-2 break-words  line-clamp`}
                title={item.description}
                data-toggle="tooltip"
              >
                <p>{item.description}</p>
              </div> 
              <div className=" absolute left-4 bottom-5 grid grid-cols-10 content-center">
                <div className="col-span-1 mr-2">
                  <Image
                    src="/iconsimgs/location.svg"
                    alt="Pinicons"
                    width={15}
                    height={10}
                    className=" object-contain "
                  />
                </div>
                <div className="col-span-8">
                  <p
                    className={`text-[14px] tracking-normal break-all text-light-dark opacity-80 line-clamps`}
                    title={item.location}
                    data-toggle="tooltip"
                  >
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {children}
    </div>
  );
};

export default Pagination;
