
import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import { toast } from "react-toastify";

import Router, { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";

interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
  email?: any;
  name?: string;
  skills?: string;
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
  const [isOpen, setIsOpen] = useState(false);
  const [jobData, setJobData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { user } = useContext(authcontext);
  const [myData, setMyData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const page = router.query?.page ? Number(router.query.page) : 1;
    if (!isNaN(page) && page > 0) {
      setCount(page);
      reloadData(page);
    }
  }, [router]);

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
    } else {
      return [num - 1, num];
    }
  };

  const reloadData = (page: number) => {
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
          setMyData(resp.data?.data);
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

  //  const totalJobs = myData?.length;
  const increment = () => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/jobs-posted-by-you?page=${count + 1}`, undefined, {
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
      router.push(`/jobs-posted-by-you?page=${count - 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const onNumClick = (e: any) => {
    const numValue = +e.target.innerText;

    setCount(numValue);
    router.push(`/jobs-posted-by-you?page=${numValue} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const postClick = (job_id: string | undefined) => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
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
        setJobData(data?.data);
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
          <div className="px-[70px] xs:px-10 2xl:px-[160px] xl:px-[160px] md:px-[160px] ">
            <div className="flex text-center items-center pt-3">
              <Link href={"/jobs-posted-by-you"}>
                <Image
                  src="/iconsimgs/homemd.svg"
                  alt=""
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
        ) : myData?.length > 0 ? (
          <div>
            <div className="flex flex-wrap items-center gap-[2%] mainWrapper justify-center md:justify-start md:px-40 xs:px-1 px-8  ">
              {myData?.map((item: cardTypes, key) => {
                return (
                  <div
                    className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[23%] h-[180px] bg-white rounded mb-4 px-4 py-4 relative capitalize shadow"
                    key={key}
                  >
                    <div
                      className={`text-[17px] text-light-dark tracking-normal line-clamps  `}
                      key={key}
                      title={item.title}
                      data-toggle="tooltip"
                    >
                      <h1>{item.title}</h1>
                    </div>
                    <div
                      className={` text-[14px]  tracking-normal text-light-dark opacity-80 my-2 mx-0 line-clamp`}
                      
                      title={item.description}
                      data-toggle="tooltip"
                    >
                      <p>{item.description}</p>
                    </div>
                    <div
                      className={`flex items-center flex-wrap absolute bottom-4 justify-between w-[88%]`}
                    >
                      <div className="flex justify-between">
                        <div className="relative w-4 h-4 mr-1">
                          <Image
                            src="/iconsimgs/location.svg"
                            alt="Pinicon"
                            fill
                            className="absolute top-0 object-contain"
                          />
                        </div>
                        <h3
                          className={`w-[64px] h-[16px] text-[14px] tracking-normal text-light-dark opacity-80 line-clamps  `}
                          title={item.location}
                          data-toggle="tooltip"
                        >
                          {item.location}
                        </h3>
                      </div>
                      <div>
                        <button
                          className={`w-[125px] h-[32px] bg-[#43afff33] rounded   text-light-dark capitalize text-[12px] p-2`}
                          onClick={() => postClick(item.id)}
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

    
      {isOpen && (
        <>
          <div
            className="h-screen w-screen fixed bg top-0 flex justify-center items-center "
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#fff] md:w-[694px] w-[310px] h-[731px] md:h-[731] m-auto relative rounded-[20px] flex flex-col xs:py-8 xs:px-4  py-6 px-8   "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-0 py-3 text-[19px] text-light-dark font-medium ">
                <h2>Applicants for this job</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <Image src="/iconsimgs/metrocross.svg" alt="metrocross" width={15} height={15} />
                </button>
              </div>
              <hr />
              <h3 className="text-light-dark text-[15px]  py-2 ">
              {jobData?.length >0?"Total":""} {jobData ? jobData.length : 0} applications
              </h3>
              <div className="bg-[#557da526] flex justify-start  flex-wrap overflow-auto h-full p-2 gap-4 ">
                {loader ? (
                  <Loader />
                ) : jobData ? (
                  jobData?.map((items: cardTypes, k) => {
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
                              >
                                {items.skills}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col justify-center items-center text-[20px] opacity-80  w-full h-full ">
                    <div>
                     <Image
                        src="/iconsimgs/curriculum.svg"
                        alt=""
                        className="mb-4 opacity-50 "
                        width={85}
                        height={106}
                      />
                     
                     </div>
                     <h3>No applications available!</h3>
               
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;



