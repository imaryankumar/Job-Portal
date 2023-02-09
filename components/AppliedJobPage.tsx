import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { toast } from 'react-toastify';
import Seo from './nexthead/Seo';
import Link from 'next/link';
import Loader from './Loader/Loader';
import Pagination from './Pagin';
import { jobData } from '../utils/types';
type Props = {}

const AppliedJobPage = (props: Props) => {
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
        <div className="bg-dark-blue w-full h-[18vh] text-white ">
          <div className=" px-40 xs:px-20 mainWrapper ">
          <Link href="/jobs-for-you">
            <div className="flex  text-center items-center pt-5  text-xs opacity-80   ">
              
                <Image
                  src="/iconsimgs/homemd.svg"
                  alt="Homeicon"
                  width={10}
                  height={9}
                />
             
              <p className="ml-1 text-[12px] font-medium ">
                {" "}
                Home &gt;<Link href={"/applied-jobs"}>Applied Jobs</Link> 
              </p>
            </div>
            </Link>
            <div className="mt-4 mb-4 text-[22px] font-medium xs:text-base ">
              <h1>Jobs applied by you</h1>
            </div>
          </div>
          {myCanData?.length > 0 ? (
            <div className="relative " >
              <Pagination data={myCanData} pagination={pagination}>
              <div className="absolute -bottom-28 right-0 left-0" >
              {myCanData?.length > 0 && totalPage > 1 && (
          <div>
            <div className="flex flex-wrap  justify-center  items-center gap-[2%] mainWrapper cursor-pointer py-8   ">
              <Image
                src="/iconsimgs/Prev.svg"
                alt="Lefticon"
                onClick={() => decrement()}
                width={30}
                height={30}
                className={count==1?'cursor-no-drop' :""}
              />
             
              {count > 1 ? (
                <>
                  <div
                    className="h-8 w-8 rounded  text-black text-center text-[19px] font-[400] "
                    onClick={() => onNumClick(1)}
                  >
                    1
                  </div>
                 {/* <span className="text-black" >...</span> */}
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
                        : { backgroundColor: "white", cursor: "pointer" }
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
                    {/* <span className="text-black" >...</span> */}
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
                className={count==totalPage?'cursor-no-drop' :""}
              />
            </div>
          </div>
        )}
              </div>
                </Pagination>           
            
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
}

export default AppliedJobPage