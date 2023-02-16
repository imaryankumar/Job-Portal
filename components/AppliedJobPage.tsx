import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Seo from "./nexthead/Seo";
import Loader from "./Loader/Loader";
interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
}
interface jobApply {
  email: string;
  name: string;
  skills: string;
  id: string;
}

const Index = () => {
  const router = useRouter();
  const pageNum = router.asPath?.split("=")[1];
  const [pageCount, setpageCount] = useState(+pageNum || 1);
  const [showPerPage] = useState(20);
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage });
  const [appliedjob, setAppliedjob] = useState<jobApply[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const value = showPerPage * pageCount;
    setPagination({ start: value - showPerPage, end: value });
  }, [pageCount, showPerPage]);

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
          function compare(a: any, b: any) {
            if (a.updatedAt < b.updatedAt) {
              return -1;
            }
            if (a.updatedAt > b.updatedAt) {
              return 1;
            }
            return 0;
          }
          let d = resp.data?.sort(compare);

          setAppliedjob(d);
          setLoader(false);
        });
      })
      .catch((e) => {
        toast.error("Error Found");
        setLoader(false);
      });
  }, []);

  const totalJobs = appliedjob?.length;
  const totalPage = Math.ceil(totalJobs / showPerPage);

  const paginationInc = () => {
    if (pageCount < totalPage) {
      pageCount < totalPage && setpageCount(pageCount + 1);
      router.push(`/applied-jobs?page=${pageCount + 1} `, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const paginationDec = () => {
    if (pageCount > 1) {
      pageCount == 1 ? setpageCount(1) : setpageCount(pageCount - 1);
      router.push(`/applied-jobs?page=${pageCount - 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const paginationbtnClick = (e: number) => {
    setpageCount(e);
    router.push(`/applied-jobs?page=${e} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const pageDefiner = (num: any) => {
    if (num > 2) {
      return [num - 2, num - 1, num];
    } else if (num == 2) {
      return [num - 1, num];
    } else {
      return [num];
    }
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

        {appliedjob?.length > 0 ? (
          <div className="relative">
            <div className="min-h-[80vh] pb-20 ">
              <div className="flex md:mx-40  justify-center 2xl:mx-[24rem] md:justify-start gap-4 md:gap-x-2 lg:gap-x-3 flex-wrap ">
                {appliedjob
                  ?.slice(pagination.start, pagination.end)
                  .map((item: cardTypes, key) => {
                    return (
                      <div
                        className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[32%] xl:w-[24%] h-[180px] bg-white rounded  px-4 py-4 relative capitalize shadow "
                        key={key}
                      >
                        <div
                          className={`text-[17px] text-light-dark tracking-normal line-clamps break-words `}
                          key={key}
                          title={item.title}
                          data-toggle="tooltip"
                        >
                          <h1>{item.title}</h1>
                        </div>
                        <div
                          className={` text-[14px] tracking-normal text-light-dark opacity-80 mx-0 my-2 break-words line-clamp`}
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
                  {appliedjob?.length > 0 && (
                    <div>
                      <div className="flex flex-wrap justify-center  items-center gap-3 mainWrapper  cursor-pointer py-4  ">
                        <div
                          className={`cursor-pointer rounded-md border px-3 py-2 text-gray-500 ${
                            pageCount == 1 && `cursor-no-drop text-gray-400`
                          } `}
                          onClick={() => paginationDec()}
                        >
                          <div className="w-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 512"
                            >
                              <path
                                d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        {pageCount > 1 && totalPage > 3 ? (
                          <>
                            <div
                              className="py-[1px] px-2 rounded bg-white text-black text-center text-[19px] font-[400] "
                              onClick={() => paginationbtnClick(1)}
                            >
                              1
                            </div>
                            <span className="text-black">...</span>
                          </>
                        ) : (
                          ""
                        )}
                        {(pageCount + 2 >= totalPage
                          ? pageDefiner(totalPage)
                          : [pageCount, pageCount + 1, pageCount + 2]
                        )?.map((i, k) => {
                          return (
                            <span
                              className="py-[1px] px-2 rounded bg-[#43afff33] text-center text-[19px] text-black font-[400]"
                              onClick={() => paginationbtnClick(i)}
                              style={
                                pageCount === i
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
                        {pageCount + 2 >= totalPage ? (
                          ""
                        ) : (
                          <>
                            <span className="text-black">...</span>
                            <div
                              className="py-[1px] px-2 rounded bg-white text-center text-[19px] text-black font-[400]"
                              onClick={() => paginationbtnClick(totalPage)}
                            >
                              {totalPage}
                            </div>
                          </>
                        )}

                        <div
                          className={`cursor-pointer rounded-md border  px-3 py-2 text-gray-500 ${
                            pageCount == totalPage &&
                            `cursor-no-drop text-gray-400 `
                          }`}
                          onClick={() => paginationInc()}
                        >
                          <div className="w-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 512"
                            >
                              <path
                                d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
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
