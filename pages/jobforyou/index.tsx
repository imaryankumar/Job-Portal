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
    } else {
      return [num - 1, num];
    }
  };
  const increment = () => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/jobforyou?page=${count + 1} `, undefined, {
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
      router.push(`/jobforyou?page=${count - 1}`, undefined, { shallow: true });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const onNumClick = (e: number) => {
    setCount(e);
    router.push(`/jobforyou?page=${e} `, undefined, {
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
      <Seo title="JobForYou" />

      <div className="bg-dark-blue w-full h-[18vh] text-white relative ">
        <div className="mainWrapper">
          <div className=" md:px-44  xs:px-20 px-32 py-0  ">
            <div className="flex text-center items-center md:pt-1 pt-3   ">
              <Link href="/jobforyou">
                <Image
                  src="/iconsimgs/homemd.svg"
                  alt="Homeicon"
                  width={10}
                  height={9}
                />
              </Link>
              <Link href="/jobforyou">
                <span className="pl-1 text-[12px] font-medium ">Home</span>
              </Link>
            </div>
            <div className=" mt-4  text-[22px] font-medium  ">
              <h1>Jobs for you</h1>
            </div>
          </div>
          <div className="flex justify-start items-center gap-[2%] flex-wrap mt-8 xs:mt-5 py-0 px-8 ">
            <div className="flex flex-wrap items-center justify-center w-full ">
              {loader ? (
                <Loader />
              ) : (
                myCanData?.map((item: cardTypes, key) => {
                  return (
                    <div
                      className="w-[260px] h-[162px] bg-white rounded p-4 mr-4 mb-4 relative capitalize shadow  "
                      key={key}
                    >
                      <div
                        className={`w-full h-[20px] text-[17px]  text-light-dark tracking-normal line-clamps`}
                        key={key}
                      >
                        <h1>{item.title}</h1>
                      </div>
                      <div
                        className={`w-[229px] text-[14px] tracking-normal text-light-dark opacity-80 my-2 mx-0 line-clamps`}
                      >
                        <p>{item.description}</p>
                      </div>
                      <div className="flex items-center text-center  absolute bottom-4 justify-center ">
                        <div className="flex mr-4">
                          <div className="relative w-4 h-4 mr-2">
                            <Image
                              src="/iconsimgs/location.svg"
                              alt="Pinicons"
                              fill
                              className="absolute top-0 object-contain"
                            />
                          </div>
                          <h3
                            className={`w-[64px] h-[16px] text-[14px] tracking-normal text-light-dark opacity-80 line-clamps`}
                          >
                            {item.location}
                          </h3>
                        </div>
                        <div>
                          {loader ? (
                            <Loader />
                          ) : (
                            <button
                              className="w-[125px] h-[32px] bg-[#43afff33] rounded  cursor-pointer text-light-dark capitalize text-[12px] p-2 "
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white-blue w-full h-auto ">
        <div className="flex justify-center text-center items-center gap-[1%] xs:pt-[100rem] md:pt-[55rem] lg:pt-[40rem] xl:pt-[28rem] 2xl:pt-[15rem] cursor-pointer pb-8  ">
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
                className="w-8 h-8 rounded bg-white text-center text-[19px] font-[400] "
                onClick={() => onNumClick(1)}
              >
                1
              </div>
              ...
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
                className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-[400]"
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
              ...
              <div
                className="w-8 h-8 rounded bg-white text-center text-[19px] font-[400]"
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
    </>
  );
};

export default Index;
