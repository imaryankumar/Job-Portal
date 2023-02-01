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
          console.log("Data : ", resp.data?.data);
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
      router.push(`/postjobyou?page=${count + 1}`, undefined, {
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
      router.push(`/postjobyou?page=${count - 1}`, undefined, {
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
    console.log(numValue);
    setCount(numValue);
    router.push(`/postjobyou?page=${numValue} `, undefined, {
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
        console.log("Data :", data?.data);
      })
      .catch((e) => {
        toast.error(e);
        toast.error("Error Found");
        setLoader(false);
      });
  };

  return (
    <>
      <Seo title="PostJobYou" />
      <div className="bg-[#1A253C] w-full h-[18vh] text-white">
        <div className="mainWrapper">
          <div className="px-44 py-0">
            <div className="flex text-center items-center pt-[5px]">
              <Link href={"/"}>
                <Image
                  src="/iconsimgs/homeicon.png"
                  alt=""
                  width={10}
                  height={9}
                  className="mr-1"
                />
              </Link>
              <Link href={"/"}>
                {" "}
                <span>Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1>Jobs posted by you</h1>
            </div>
          </div>
        </div>

        {loader ? (
          <Loader />
        ) : myData?.length > 0 ? (
          <div className="flex justify-center items-center flex-wrap mt-8 gap-[2%]">
            <div className="flex flex-wrap items-center justify-center px-8 py-6">
              {myData?.map((item: cardTypes, key) => {
                return (
                  <div
                    className="w-[260px] h-[162px] bg-white rounded p-4 mr-4 mb-4 relative capitalize shadow "
                    key={key}
                  >
                    <div
                      className={`w-full h-[20px] text-[17px] opacity-100 text-[#303f60] tracking-normal overflow-hidden`}
                      key={key}
                    >
                      <h1>{item.title}</h1>
                    </div>
                    <div
                      className={`"w-[229px] mx-0 my-2 opacity-80 text-[#303f60] tracking-normal overflow-hidden`}
                    >
                      <p>{item.description}</p>
                    </div>
                    <div
                      className={`flex items-center text-center  absolute bottom-4 justify-center overflow-hidden`}
                    >
                      <div className="flex mr-4">
                        <Image
                          src="/iconsimgs/mypin.png"
                          alt=""
                          width={10}
                          height={15}
                        />
                        <h3
                          className={`w-[64px] h-[16px] line-clamps text-[14px] tracking-normal text-[#303f60] opacity-80`}
                        >
                          {item.location}
                        </h3>
                      </div>
                      <div>
                        <button
                          className={`w-[125px] h-[32px] bg-[#43afff33] rounded opacity-100 cursor-pointer text-[#303f60] capitalize text-[12px] p-2 `}
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
            <Seo title="PostedJob" />

            <div className="bg-[#edf6ff] w-full h-[90vh] mt-12 ">
              <div className="flex flex-col items-center justify-center px-0 py-40">
                <Image
                  src="/iconsimgs/write.png"
                  alt=""
                  width={106}
                  height={106}
                />
                <h2 className="w-[289px] h-[23px] text-[#303f60] text-[20px] opacity-80 py-4 px-0  ">
                  Your posted jobs will show here!
                </h2>
                <button
                  className="w-40 h-[46px] bg-blue-400 border border-solid border-blue-400 rounded opacity-100 flex items-center justify-center mt-10 cursor-pointer text-white "
                  onClick={() => router.push("/jobpost")}
                >
                  Post a Job
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {myData?.length > 0 && totalPage > 1 && (
        <div className="bg-[#edf6ff] w-full h-auto">
          <div className="flex justify-center text-center items-center gap-[10px] pt-[55rem] pb-8  ">
            <Image
              src="/iconsimgs/left.png"
              alt=""
              onClick={() => decrement()}
              width={30}
              height={30}
            />
            {(count + 2 >= totalPage
              ? pageDefiner(totalPage)
              : [count, count + 1, count + 2]
            )?.map((i, key) => {
              return (
                <span
                  className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-normal "
                  onClick={(e) => onNumClick(e)}
                  style={
                    count === i
                      ? {
                          color: "black",
                          backgroundColor: "#43AFFF33",
                          cursor: "pointer",
                        }
                      : { backgroundColor: "white", cursor: "pointer" }
                  }
                  key={key}
                >
                  {i}
                </span>
              );
            })}
            {count + 2 >= totalPage ? (
              ""
            ) : (
              <>
                ...
                <div
                  className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-[400] "
                  onClick={() => onNumClick(totalPage)}
                >
                  {totalPage}
                </div>
              </>
            )}

            <Image
              src="/iconsimgs/right.png"
              alt=""
              onClick={() => increment()}
              width={30}
              height={30}
            />
          </div>
        </div>
      )}
      {isOpen && (
        <>
          <div
            className="h-screen w-screen absolute bg top-0 flex justify-center items-center  "
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#fff] w-[48%] h-[85%] m-auto relative rounded-[20px] flex flex-col px-8 py-4 "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-0 py-3 text-[19px] text-[#303f60] ">
                <h2>Applicants for this job</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-[50%] text-black text-lg  font-bold"
                >
                  X
                </button>
              </div>
              <hr />
              <h3 className="text-[#303f60] text-[15px] px-0 py-2 ">
                Total {jobData ? jobData.length : 0} applications
              </h3>
              <div className="bg-[#557da526] flex justify-start w-full h-[73vh] flex-wrap ">
                {loader ? (
                  <Loader />
                ) : jobData ? (
                  jobData?.map((items: cardTypes, k) => {
                    return (
                      <div key={k} className="p-2">
                        <div className="w-[295px] h-[159px] flex items-center justify-center bg-white border border-solid border-[#303f6080] rounded py-0 px-2 flex-wrap ">
                          <div className="w-[274px] h-[131px] capitalize ">
                            <div className="flex items-center">
                              <span className="w-[35px] h-[35px] rounded-[25px] opacity-100 bg-[#d9efff] text-[#303f60] text-[20px] flex justify-center items-center mr-4 ">
                                {items.name?.slice(0, 1)}
                              </span>
                              <div>
                                <h2
                                  className={`text-[#303f60] font-[15px] opacity-100 line-clamps`}
                                >
                                  {items.name}
                                </h2>
                                <h3
                                  className={`text-[#303f60] opacity-100 text-[10px] line-clamps`}
                                >
                                  {items.email}
                                </h3>
                              </div>
                            </div>

                            <div className="pt-8">
                              <h2 className="text-[#1a253c] opacity-100 text-[13px]  ">
                                Skills
                              </h2>
                              <h3
                                className={`text-[#303f60] opacity-100 text-[15px] line-clamps`}
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
                  <div className="w-auto h-auto ">
                    <div className="h-[550px] w-[610px] text-[20px] opacity-80 flex flex-col justify-center items-center">
                      <Image
                        src="/iconsimgs/resume.png"
                        alt=""
                        className="mb-4 w-[100px] h-[106px] opacity-50 "
                        width={100}
                        height={106}
                      />
                      <h3>No applications available!</h3>
                    </div>
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
