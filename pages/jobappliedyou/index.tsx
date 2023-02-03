import Link from "next/link";
import { useEffect, useState } from "react";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
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
      router.push(`/jobappliedyou?page=${count + 1} `, undefined, {
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
      router.push(`/jobappliedyou?page=${count - 1}`, undefined, {
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
    router.push(`/jobforyou?page=${e} `, undefined, {
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
      <Seo title="JobAppliedYou" />{" "}
      <div className="bg-[#1A253C] w-full h-[18vh] text-white ">
        <div className=" md:px-44  xs:px-20 px-32 py-0 ">
          <div className="flex  text-center items-center pt-4 xs:pt-6 text-xs opacity-80  ">
            <Link href={"/"}>
              <Image
                src="/iconsimgs/homeicon.png"
                alt="Homeicon"
                width={10}
                height={9}
              />
            </Link>
            <p className="ml-1 text-[12px] font-medium ">
              {" "}
              Home &gt; Applied Jobs
            </p>
          </div>
          <div className="mt-4  text-[22px] font-medium xs:text-base ">
            <h1>Jobs applied by you</h1>
          </div>
        </div>
        {myCanData?.length > 0 ? (
          <div className=" mt-8">
            <div className="flex flex-wrap items-center justify-center   px-8 py-0">
              {myCanData
                ?.slice(pagination.start, pagination.end)
                .map((item: cardTypes, key) => {
                  return (
                    <div
                      className="w-[260px] h-[162px] bg-white shadow rounded p-4 mr-4 mb-4 relative capitalize "
                      key={key}
                    >
                      <div
                        className={`w-full h-[20px] text-[17px] tracking-normal text-[#303f60]  line-clamps`}
                        key={key}
                      >
                        <h1>{item.title}</h1>
                      </div>
                      <div
                        className={`w-[229px] text-[14px] tracking-normal text-[#303f60] opacity-80 mx-0 my-2 line-clamps`}
                      >
                        <p>{item.description}</p>
                      </div>
                      <div className="flex items-center text-center absolute justify-center bottom-4 ">
                        <div className="flex">
                          <Image
                            src="/iconsimgs/mypin.png"
                            alt="Pinicons"
                            width={10}
                            height={15}
                          />
                          <h3
                            className={`w-[64px] h-[16px] text-[14px] tracking-normal text-[#303f60] opacity-80 line-clamps`}
                          >
                            {item.location}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                <h2 className="w-[292px] h-[23px] text-[#303f60] text-[20px] opacity-80 px-0 py-4 ">
                  Your applied jobs will show here!
                </h2>
                <button
                  className="w-40 h-[46px]  font-medium  bg-blue-400 border border-solid border-blue-400 text-[16px] rounded  flex items-center justify-center mt-10 cursor-pointer text-white"
                  onClick={() => router.push("/jobforyou")}
                >
                  See all jobs
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {myCanData?.length > 0 && totalPage > 1 && (
        <div className="h-auto  ">
          <div className="flex flex-wrap justify-center text-center items-center gap-[1%] xs:pt-[222rem] md:pt-[110rem] lg:pt-[80rem] xl:pt-[55rem] cursor-pointer pb-8 ">
            <Image
              src="/iconsimgs/left.png"
              alt="Lefticon"
              onClick={() => decrement()}
              width={20}
              height={20}
            />
            {/* <span className={style.postjobyou_span}>{count}</span> */}
            {count > 1 ? (
              <>
                <div
                  className="h-8 w-8 rounded bg-[#43afff33] text-center text-[19px] font-[400] "
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
              ? [totalPage - 2, totalPage - 1, totalPage]
              : [count, count + 1, count + 2]
            )?.map((i, k) => {
              return (
                <span
                  className="h-8 w-8 rounded bg-[#43afff33] text-center text-[19px] font-[400]"
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
                  className="h-8 w-8 rounded bg-[#43afff33] text-center text-[19px] font-[400]"
                  onClick={() => onNumClick(totalPage)}
                >
                  {totalPage}
                </div>
              </>
            )}
            <Image
              src="/iconsimgs/right.png"
              alt="Righticon"
              onClick={() => increment()}
              width={20}
              height={20}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
