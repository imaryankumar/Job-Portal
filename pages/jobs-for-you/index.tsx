import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";

interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id: string;
  updatedAt?: any;
}
interface applyData {
  email: string;
  name: string;
  skills: string;
  id: string;
}
const Index = () => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(1);
  const [candiapplyJob, setCandiapplyJob] = useState<applyData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(authcontext);
  const pageNum = router.asPath?.split("=")[1];
  useEffect(() => {
    const page = pageNum ? +pageNum : 1;
    if (!isNaN(page) && page > 0) {
      setPageCount(page);
      jobapplyHandler(page);
    }
  }, [router, pageNum]);

  let myArray = useMemo(() => {
    if (!isNaN(totalPage)) {
      return Array(totalPage)
        .fill("")
        .map((e, index) => index + 1);
    }
    return [];
  }, [totalPage]);

  const jobapplyHandler = (page: number) => {
    setLoader(true);

    fetch(
      `https://jobs-api.squareboat.info/api/v1/candidates/jobs?page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("user") || "{}")
            ?.token,
        },
      }
    )
      .then((res) => {
        res.json().then((resp) => {
          setCandiapplyJob(resp.data);
          setLoader(false);

          setTotalPage(
            Math.ceil(resp?.metadata?.count / resp?.metadata?.limit)
          );
        });
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Found");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const pageDefiner = (num: any) => {
    if (num > 2) {
      return [num - 2, num - 1, num];
    } else if (num == 1) {
      return [num];
    } else {
      return [num - 1, num];
    }
  };
  const paginationInc = () => {
    if (pageCount < totalPage) {
      pageCount < totalPage && setPageCount(pageCount + 1);
      router.push(`/jobs-for-you?page=${pageCount + 1} `, undefined, {
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
      pageCount == 1 ? setPageCount(1) : setPageCount(pageCount - 1);
      router.push(`/jobs-for-you?page=${pageCount - 1}`, undefined, {
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
    setPageCount(e);
    router.push(`/jobs-for-you?page=${e} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const appliedJobHandler = (id: string) => {
    const getData = () => {
      const body = {
        jobId: id,
      };

      fetch("https://jobs-api.squareboat.info/api/v1/candidates/jobs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("user") || "{}")
            ?.token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((showres) => {
          if (showres.success === true) {
            toast.success("You have applied successfully.");
            jobapplyHandler(pageCount);
          }
        })
        .catch((e) => {
          toast.error("Something went wrong");
          setLoader(false);
        });
    };
    getData();
  };

  return (
    <>
      <Seo title="Jobs for you" />

      <div className="bg-dark-blue w-full h-[18vh] text-white relative ">
        <div className="mainWrapper">
          <div className="px-40 xs:px-5">
            <div className="flex text-center items-center  pt-3   ">
              <Link href="/jobs-for-you">
                <Image
                  src="/iconsimgs/homemd.svg"
                  alt="Homeicon"
                  width={10}
                  height={9}
                  className="mr-1"
                />
              </Link>
              <Link href="/jobs-for-you">
                <span className="pl-1 text-[12px] font-medium ">Home</span>
              </Link>
            </div>
            <div className=" mt-4 mb-4 text-[22px] font-medium  ">
              <h1>Jobs for you</h1>
            </div>
          </div>
          <div>
            {loader ? (
              <Loader />
            ) : (
              <div className="relative">
                <div className="min-h-[80vh] pb-20 ">
                  <div className="flex md:mx-40  justify-center md:justify-start gap-4 md:gap-x-2 lg:gap-x-3 flex-wrap ">
                    {candiapplyJob?.map((item: cardTypes, key) => {
                      return (
                        <div
                          className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[32%] xl:w-[24%] h-[180px] bg-white rounded px-4 py-4 relative capitalize shadow "
                          key={key}
                        >
                          <div
                            className={`text-[17px] text-light-dark tracking-normal line-clamps break-words  `}
                            key={key}
                            title={item.title}
                            data-toggle="tooltip"
                          >
                            <h1>{item.title}</h1>
                          </div>
                          <div
                            className={` text-[14px]  tracking-normal text-light-dark opacity-80 my-2 mx-0  break-words line-clamp `}
                            title={item.description}
                            data-toggle="tooltip"
                          >
                            <p>{item.description}</p>
                          </div>
                          <div className="absolute left-4 bottom-5 grid grid-cols-5 pr-6 ">
                            <div className="grid grid-cols-12 content-center col-span-4">
                              <div className="col-span-1">
                                <Image
                                  src="/iconsimgs/location.svg"
                                  alt="Pinicons"
                                  width={15}
                                  height={10}
                                  className="object-contain "
                                />
                              </div>
                              <div className="col-span-8 ml-2">
                                <p
                                  className={`text-[14px] tracking-normal break-all text-light-dark opacity-80 line-clamps`}
                                  title={item.location}
                                  data-toggle="tooltip"
                                >
                                  {item.location}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              {loader ? (
                                <Loader />
                              ) : (
                                <button
                                  className="px-3 py-2 bg-[#43afff33] rounded  cursor-pointer text-light-dark capitalize text-[12px]  "
                                  onClick={() => appliedJobHandler(item.id)}
                                >
                                  Apply
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 ">
                    <div className="flex justify-center text-center items-center gap-[1%]  cursor-pointer py-4  ">
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
                      {pageCount > 1 && totalPage > 2 ? (
                        <>
                          <div
                            className="py-[1px] px-2 rounded bg-white text-center text-[19px] font-[400] text-black "
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
                            className="py-[1px] px-2 rounded bg-[#43afff33] text-center text-[19px] font-[400] text-black "
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
                            className="py-[1px] px-2 rounded bg-white text-center text-[19px] font-[400] text-black "
                            onClick={() => paginationbtnClick(totalPage)}
                          >
                            {totalPage}
                          </div>
                        </>
                      )}

                      <div
                        className={`cursor-pointer rounded-md border px-3 py-2 text-gray-500 ${
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
                      {}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white-blue "></div>
    </>
  );
};

export default Index;
