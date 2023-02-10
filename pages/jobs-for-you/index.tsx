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
interface jobData {
  email: string;
  name: string;
  skills: string;
  id: string;
}
const Index = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);

  const [myCanData, setCanMyData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);

  const { user } = useContext(authcontext);
  const pageNum=router.asPath?.split('=')[1]
  useEffect(() => {
    const page =  pageNum ? +pageNum : 1;
    if (!isNaN(page) && page > 0) {
      setCount(page);
      reloadData(page);
    }
  }, [router,pageNum]);

  let myArray = useMemo(() => {
    if (!isNaN(totalPage)) {
      return Array(totalPage)
        .fill("")
        .map((e, index) => index + 1);
    }
    return [];
  }, [totalPage]);

  const reloadData = (page: number) => {
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
          setCanMyData(resp.data);
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
    }else if(num==1){
      return [num];
    }
     else {
      return [num - 1, num];
    }
  };
  const increment = () => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/jobs-for-you?page=${count + 1} `, undefined, {
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
      router.push(`/jobs-for-you?page=${count - 1}`, undefined, { shallow: true });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const onNumClick = (e: number) => {
    setCount(e);
    router.push(`/jobs-for-you?page=${e} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const clickMe = (id: string) => {
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
            toast.success("Applied Successfull");
            reloadData(count);
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
              <div className="absloute" >
                 <div  className="flex flex-wrap items-center gap-[2%] mainWrapper justify-center md:justify-start md:px-40 xs:px-1 px-8" >
                {
                   myCanData?.map((item: cardTypes, key) => {
                    return (
                      <div
                        className="w-[80%] sm:w-[32%] md:w-[49%] lg:w-[23%] h-[180px] bg-white rounded mb-4 px-4 py-4 relative capitalize shadow"
                        key={key}
                      >
                        <div
                          className={`text-[17px] text-light-dark tracking-normal line-clamps break-word  `}
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
                        <div className="absolute left-4 bottom-5 grid grid-cols-6">

                        <div className="grid grid-cols-12 content-center col-span-4">
                     <div className="col-span-1">
                     <Image
                            src="/iconsimgs/location.svg"
                            alt="Pinicons"
                            width={15}
                            height={10}
                            className=" object-contain "
                          />
                     </div>
                          <div className="col-span-8 ml-2">
                          <p className={`text-[14px] tracking-normal break-all text-light-dark opacity-80 line-clamps`}
                           title={item.location}
                           data-toggle="tooltip"
                          >{item.location}</p>
                          </div>
                       
                      </div>
                      <div className="col-span-2">
                            {loader ? (
                              <Loader />
                            ) : (
                              <button
                                className="px-4 py-2 bg-[#43afff33] rounded  cursor-pointer text-light-dark capitalize text-[12px]  "
                                onClick={() => clickMe(item.id)}
                              >
                                Apply
                              </button>
                            )}
                          </div>
                        </div>
                       
                      </div>
                    );
                  })
                }
               </div>
               <div className="absolute left-0 right-0 " >
               <div className="flex justify-center text-center items-center gap-[1%]  cursor-pointer py-4  ">
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
                className="w-8 h-8 rounded bg-white text-center text-[19px] font-[400] text-black "
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
            ? pageDefiner(totalPage)
            : [count, count + 1, count + 2]
          )?.map((i, k) => {
            return (
              <span
                className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-[400] text-black "
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
             <span className="text-black">...</span>
              <div
                className="w-8 h-8 rounded bg-white text-center text-[19px] font-[400] text-black "
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
            {}
        </div>
               </div>
              </div>
              )}
            
          </div>
        </div>
      </div>
      <div className="bg-white-blue ">
       
      </div>
    </>
  );
};

export default Index;
