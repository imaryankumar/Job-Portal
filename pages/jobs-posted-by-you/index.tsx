import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";
import { CardType, JobApply } from "../../utils/types";

const Index = () => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(1);
  const [modalopen, setModalopen] = useState(false);
  const [candapplyJob, setCandapplyJob] = useState<JobApply[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { user } = useContext(authcontext);
  const [postjobData, setPostjobData] = useState([]);
  const [loader, setLoader] = useState(true);

  const pageNum = router.asPath?.split("=")[1];
  useEffect(() => {
    const page = pageNum ? +pageNum : 1;
    if (!isNaN(page) && page > 0) {
      setPageCount(page);
      jobpostHandler(page);
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

  const pageDefiner = (num: any) => {
    if (num > 2) {
      return [num - 2, num - 1, num];
    } else if (num == 1) {
      return [num];
    } else {
      return [num - 1, num];
    }
  };

  const jobpostHandler = (page: number) => {
    setLoader(true);
    fetch(
      `https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${page}`,
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
          setPostjobData(resp.data?.data);
          setLoader(false);

          setTotalPage(
            Math.ceil(resp?.data?.metadata?.count / resp?.data?.metadata?.limit)
          );
        });
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const paginationInc = () => {
    if (pageCount < totalPage) {
      pageCount < totalPage && setPageCount(pageCount + 1);
      router.push(`/jobs-posted-by-you?page=${pageCount + 1}`, undefined, {
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
      router.push(`/jobs-posted-by-you?page=${pageCount - 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const paginationbtnClick = (e: any) => {
    const numValue = +e.target.innerText;

    setPageCount(numValue);
    router.push(`/jobs-posted-by-you?page=${numValue} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const postjobHandler = (job_id: string | undefined) => {
    modalopen === false ? setModalopen(true) : setModalopen(false);
    setLoader(true);

    fetch(
      `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${job_id}/candidates`,
      {
        method: "GET",
        headers: { Authorization: `${user?.token}` },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCandapplyJob(data?.data);
        setLoader(false);
      })
      .catch((e) => {
        toast.error(e);
        toast.error("Error Found");
        setLoader(false);
      });
  };

  return (
    <>
      <Seo title="Jobs posted by you" />
      <div className="bg-dark-blue w-full h-[18vh] text-white relative">
        <div className="mainWrapper">
          <div className=" px-40 xs:px-5">
            <div className="flex text-center items-center pt-3">
              <Link href={"/jobs-posted-by-you"}>
                <Image
                  src="/iconsimgs/homemd.svg"
                  alt="Homeicon"
                  width={10}
                  height={9}
                />
              </Link>
              <Link href={"/jobs-posted-by-you"}>
                {" "}
                <span className="pl-1 text-[12px] font-medium  ">Home</span>
              </Link>
            </div>
            <div className="mt-4 mb-4 text-[22px] font-medium">
              <h1>Jobs posted by you</h1>
            </div>
          </div>
        </div>

        {loader ? (
          <Loader />
        ) : postjobData?.length > 0 ? (
          <div className="relative ">
            <div className="min-h-[80vh] pb-20  ">
              <div className="flex md:mx-40  2xl:mx-[23rem] justify-center md:justify-start gap-4 md:gap-x-2 lg:gap-x-3 flex-wrap mainWrapper  ">
                {postjobData?.map((item: CardType, key) => {
                  return (
                    <div
                      className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[23%] xl:w-[24%] h-[180px] bg-white rounded  px-4 py-4 relative capitalize shadow   "
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
                        className={` text-[14px]  tracking-normal text-light-dark opacity-80 my-2 leading-4 mx-0 line-clamp break-words`}
                        title={item.description}
                        data-toggle="tooltip"
                      >
                        <p>{item.description}</p>
                      </div>
                      <div className="absolute left-4 bottom-5 flex justify-between items-center w-[88%] gap-2 lg:block  xl:flex  ">
                        <div className="flex justify-start items-center content-center  md:pb-0 lg:pb-3 xl:pb-0 ">
                          <div className="">
                            <Image
                              src="/iconsimgs/location.svg"
                              alt="Pinicons"
                              width={15}
                              height={10}
                              className=" object-contain "
                            />
                          </div>
                          <div className=" ml-2 w-20 ">
                            <p
                              className={`text-[14px] tracking-normal break-all text-light-dark opacity-80 line-clamps`}
                              title={item.location}
                              data-toggle="tooltip"
                            >
                              {item.location}
                            </p>
                          </div>
                        </div>
                        <div className=" ">
                          <button
                            className=" py-2 px-1 bg-[#43afff33] rounded  cursor-pointer text-light-dark capitalize text-[12px]  "
                            onClick={() => postjobHandler(item.id)}
                          >
                            View applications
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-0 right-0 left-0">
              {postjobData?.length > 0 && (
                <div className="bg-white-blue md:mx-40 2xl:mx-96">
                  <div className="flex justify-center text-center items-center gap-[10px]  py-4   ">
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
                    {(pageCount + 2 >= totalPage
                      ? pageDefiner(totalPage)
                      : [pageCount, pageCount + 1, pageCount + 2]
                    )?.map((i, key) => {
                      return (
                        <span
                          className={` py-[1px] px-2 rounded cursor-pointer text-center text-[19px] font-normal text-black ${
                            pageCount === i ? " bg-[#43AFFF33] " : " bg-white"
                          }`}
                          onClick={(e) => paginationbtnClick(e)}
                          key={key}
                        >
                          {i}
                        </span>
                      );
                    })}
                    {pageCount + 2 >= totalPage ? (
                      ""
                    ) : (
                      <>
                        ...
                        <div
                          className="py-[1px] px-2 rounded bg-white text-center text-[19px] font-[400] text-black "
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
        ) : (
          <>
            <Seo title="Posted Job" />

            <div className="bg-white-blue w-full h-[90vh] mt-12 ">
              <div className="flex flex-col items-center justify-center px-0 py-40">
                <Image
                  src="/iconsimgs/writing.svg"
                  alt=""
                  width={106}
                  height={106}
                />
                <h2 className="w-[289px] h-[23px] text-light-dark text-[20px] opacity-80 py-4 px-0  ">
                  Your posted jobs will show here!
                </h2>
                <button
                  className="w-40 h-[46px] bg-light-blue border border-solid border-light-blue rounded  flex items-center justify-center mt-10 cursor-pointer text-white "
                  onClick={() => router.push("/post-job")}
                >
                  Post a Job
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {modalopen && (
        <>
          <div
            className="h-screen w-screen fixed bg top-0 flex justify-center items-center "
            onClick={() => setModalopen(false)}
          >
            <div
              className="bg-[#fff] md:w-[694px] w-[310px] h-[90%] mt-12 m-auto relative rounded-[20px] flex flex-col xs:py-8 xs:px-4  py-6 px-8    "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between py-3 text-[19px] text-light-dark font-medium ">
                <h2>Applicants for this job</h2>
                <button
                  onClick={() => setModalopen(false)}
                  className="cursor-pointer"
                >
                  <Image
                    src="/iconsimgs/metrocross.svg"
                    alt="metrocross"
                    width={15}
                    height={15}
                  />
                </button>
              </div>
              <hr />
              <h3 className="text-light-dark text-[15px]  py-2 ">
                {candapplyJob?.length > 0 ? "Total" : ""}{" "}
                {candapplyJob ? candapplyJob.length : 0} applications
              </h3>
              <div className="h-full  bg-[#557da526] overflow-y-scroll ">
                <div className={` `}>
                  {loader ? (
                    <Loader />
                  ) : candapplyJob ? (
                    <div className="flex justify-start  flex-wrap  p-2 gap-4">
                      {candapplyJob?.map((items: CardType, k) => {
                        return (
                          <div key={k} className="">
                            <div
                              key={k}
                              className=" md:w-[295px] w-[250px]  md:h-[159px] flex items-center justify-center bg-white border border-solid border-[#303f6080] rounded  px-4 py-4  flex-wrap "
                            >
                              <div className="w-[274px] h-[131px] capitalize  ">
                                <div className="flex items-center  ">
                                  <span className="w-[35px] h-[35px] rounded-[25px]  bg-[#d9efff] text- text-[20px] flex justify-center items-center mr-4  ">
                                    {items.name?.slice(0, 1)}
                                  </span>
                                  <div>
                                    <h2
                                      className={`text-light-dark text-[15px] font-medium  line-clamps`}
                                    >
                                      {items.name}
                                    </h2>
                                    <h3
                                      className={`text-light-dark  text-[10px] line-clamps`}
                                    >
                                      {items.email}
                                    </h3>
                                  </div>
                                </div>

                                <div className="pt-8">
                                  <h2 className="text-dark-blue  text-[13px] font-medium  ">
                                    Skills
                                  </h2>
                                  <h3
                                    className={`text-light-dark  text-[15px] line-clamps`}
                                    title={items.skills}
                                    data-toggle="tooltip"
                                  >
                                    {items.skills}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full mt-[38%] ">
                      <Image
                        src="/iconsimgs/curriculum.svg"
                        alt="curriculum"
                        className="mb-4 opacity-50 "
                        width={85}
                        height={106}
                      />
                      <h3>No applications available!</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
