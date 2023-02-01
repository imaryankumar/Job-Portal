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
  console.log(Number(router.query.page), count);
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
  // console.log("totalPage", totalPage);
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
          console.log("resp.data :", resp.data);
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
          console.log(e);
          toast.error("Something went wrong");
          setLoader(false);
        });
    };
    getData();
  };

  return (
    <>
      <Seo title="JobForYou" />

      <div className="bg-[#1A253C] w-full h-[18vh] text-white relative ">
        <div className="mainWrapper">
          <div className="px-44 py-0">
            <div className="flex text-center items-center pt-[5px] ">
              <Link href={"/"}>
                <Image
                  src="/iconsimgs/homeicon.png"
                  alt=""
                  width={10}
                  height={9}
                />
              </Link>
              <Link href={"/"}>
                <span>Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1>Jobs for you</h1>
            </div>
          </div>
          <div className="flex justify-start items-center gap-[2%] flex-wrap mt-8 py-0 px-8 ">
            <div className="flex flex-wrap items-center justify-center w-full min-h-[50vh] ">
              {loader ? (
                <Loader />
              ) : (
                myCanData?.map((item: cardTypes, key) => {
                  return (
                    <div
                      className="w-[260px] h-[162px] bg-white rounded p-4 mr-4 mb-4 relative capitalize shadow "
                      key={key}
                    >
                      <div
                        className={`w-full h-[20px] text-[17px] opacity-100 text-[#303f60] tracking-normal line-clamps`}
                        key={key}
                      >
                        <h1>{item.title}</h1>
                      </div>
                      <div
                        className={`w-[229px] text-[14px] tracking-normal text-[#303f60] opacity-80 my-2 mx-0 line-clamps`}
                      >
                        <p>{item.description}</p>
                      </div>
                      <div className="flex items-center text-center  absolute bottom-4 justify-center ">
                        <div className="flex mr-4">
                          <Image
                            src="/iconsimgs/mypin.png"
                            alt=""
                            width={10}
                            height={15}
                          />
                          <h3
                            className={`w-[64px] h-[16px] text-[14px] tracking-normal text-[#303f60] opacity-80 line-clamps`}
                          >
                            {item.location}
                          </h3>
                        </div>
                        <div>
                          {loader ? (
                            <Loader />
                          ) : (
                            <button
                              className="w-[125px] h-[32px] bg-[#43afff33] rounded opacity-100 cursor-pointer text-[#303f60] capitalize text-[12px] p-2 "
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
      <div className="bg-[#edf6ff] w-full h-auto">
        <div className="flex justify-center text-center items-center gap-[1%] pt-[55rem] cursor-pointer pb-8 ">
          <Image
            src="/iconsimgs/left.png"
            alt=""
            onClick={() => decrement()}
            width={30}
            height={30}
          />
          {count > 1 ? (
            <>
              <div
                className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-[400] "
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
                className="w-8 h-8 rounded bg-[#43afff33] text-center text-[19px] font-[400]"
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
    </>
  );
};

export default Index;
