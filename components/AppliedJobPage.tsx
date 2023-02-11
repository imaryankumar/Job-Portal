import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { start } from "repl";
import Seo from "./nexthead/Seo";
import Loader from "./Loader/Loader";
interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
}
interface jobData {
  email: string;
  name: string;
  skills: string;
  id: string;
}

const Index = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [showPerPage] = useState(20);
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage });
  const [myCanData, setCanMyData] = useState<jobData[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const value = showPerPage * count;
    setPagination({ start: value - showPerPage, end: value });
  }, [count, showPerPage]);

  useEffect(() => {
    setLoader(true);
    fetch(`https://jobs-api.squareboat.info/api/v1/candidates/jobs/applied?`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user") || "{}")?.token,
      },
    })
      .then((res) => {
        res.json().then((resp) => {
          setCanMyData(resp.data);
          setLoader(false);
        });
      })
      .catch((e) => {
        toast.error("Error Found");
        setLoader(false);
      });
  }, []);

  const totalJobs = myCanData?.length;
  const totalPage = Math.ceil(totalJobs / showPerPage);

  const increment = () => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/applied-jobs?page=${count + 1} `, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const decrement = () => {
    if (count > 1) {
      count == 1 ? setCount(1) : setCount(count - 1);
      router.push(`/applied-jobs?page=${count - 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const onNumClick = (e: number) => {
    setCount(e);
    router.push(`/applied-jobs?page=${e} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Seo title="Jobs applied by you" />{" "}
      <div className="bg-dark-blue w-full h-[18vh] text-white">
        <div className=" md:px-40 2xl:px-44 xs:px-4  mainWrapper ">
          <div className="flex  text-center items-center pt-5  text-xs opacity-80  ">
            <Link href="/jobs-for-you">
              <Image
                src="/iconsimgs/homemd.svg"
                alt="Homeicon"
                width={10}
                height={9}
                className="inline pb-1"
              />
              <span className="ml-1">Home &gt;</span>
            </Link>

            <p className="ml-1 text-[12px] font-medium ">
              {" "}
              <Link href={"/applied-jobs"}>Applied Jobs</Link>
            </p>
          </div>
          <div className="mt-4 mb-4 text-[22px] font-medium xs:text-base ">
            <h1>Jobs applied by you</h1>
          </div>
        </div>
        {myCanData?.length > 0 ? (
          <div className="relative">
            <div className="min-h-[80vh] pb-20 ">
              <div className="flex md:mx-40 2xl:mx-96 justify-center md:justify-start gap-4 flex-wrap ">
                {myCanData
                  ?.slice(pagination.start, pagination.end)
                  .map((item: cardTypes, key) => {
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
                          className={` text-[14px] tracking-normal text-light-dark opacity-80 mx-0 my-2 line-clamp`}
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
              </div>
              <div className="absolute bottom-0 left-0 right-0 ">
                <div className=" ">
                  {myCanData?.length > 0 && (
                    <div>
                      <div className="flex flex-wrap justify-center  items-center gap-3 mainWrapper  cursor-pointer py-8   ">
                        <Image
                          src="/iconsimgs/Prev.svg"
                          alt="Lefticon"
                          onClick={() => decrement()}
                          width={30}
                          height={30}
                          className={count == 1 ? "cursor-no-drop" : ""}
                        />

                        {count > 1 ? (
                          <>
                            <div
                              className="h-8 w-8 rounded bg-white text-black text-center text-[19px] font-[400] "
                              onClick={() => onNumClick(1)}
                            >
                              1
                            </div>
                            <span className="text-black">...</span>
                          </>
                        ) : (
                          ""
                        )}
                        {(count + 2 >= totalPage
                          ? [totalPage - 2, totalPage - 1, totalPage]
                          : [count, count + 1, count + 2]
                        )?.map((i, k) => {
                          return (
                            <span
                              className="h-8 w-8 rounded bg-[#43afff33] text-center text-[19px] text-black font-[400]"
                              onClick={() => onNumClick(i)}
                              style={
                                count === i
                                  ? {
                                      color: "black",
                                      backgroundColor: "#43AFFF33",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "white",
                                      cursor: "pointer",
                                    }
                              }
                              key={k}
                            >
                              {i}
                            </span>
                          );
                        })}
                        {count + 2 >= totalPage ? (
                          ""
                        ) : (
                          <>
                            <span className="text-black">...</span>
                            <div
                              className="h-8 w-8 rounded bg-white text-center text-[19px] text-black font-[400]"
                              onClick={() => onNumClick(totalPage)}
                            >
                              {totalPage}
                            </div>
                          </>
                        )}
                        <Image
                          src="/iconsimgs/Nex.svg"
                          alt="Righticon"
                          onClick={() => increment()}
                          width={30}
                          height={30}
                          className={count == totalPage ? "cursor-no-drop" : ""}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {loader ? (
              <Loader />
            ) : (
              <div className="mt-40 h-[50vh] xs:h-[40vh] flex flex-col items-center justify-center ">
                <Image
                  src="/iconsimgs/write.png"
                  alt="Writeicon"
                  className="opacity-50 bg-transparent "
                  width={106}
                  height={106}
                />
                <h2 className="w-[292px] h-[23px] text-light-dark text-[20px] opacity-80 px-0 py-4 ">
                  Your applied jobs will show here!
                </h2>
                <button
                  className="w-40 h-[46px]  font-medium  bg-light-blue border border-solid border-light-blue text-[16px] rounded  flex items-center justify-center mt-10 cursor-pointer text-white"
                  onClick={() => router.push("/jobs-for-you")}
                >
                  See all jobs
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Index;
