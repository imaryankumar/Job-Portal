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
      <div className="bg-[#303f60] w-full h-[18vh] text-white ">
        <div className="px-44 py-0">
          <div className="flex text-center items-center pt-[5px] text-[12px] opacity-80 ">
            <Link href={"/"}>
              <Image
                src="/iconsimgs/homeicon.png"
                alt=""
                width={10}
                height={9}
              />
            </Link>
            Home &gt; Applied Jobs
          </div>
          <div className="mt-4">
            <h1>Jobs applied by you</h1>
          </div>
        </div>
        {myCanData?.length > 0 ? (
          <div className="flex justify-start items-center gap-[2%] flex-wrap mt-8 px-32 py-0 ">
            <div className="flex flex-wrap items-center justify-start px-8 py-0">
              {myCanData
                ?.slice(pagination.start, pagination.end)
                .map((item: cardTypes, key) => {
                  return (
                    <div
                      className="w-[260px] h-[162px] bg-[#ffffff] shadow rounded-[5px] p-4 mr-4 mb-4 relative capitalize "
                      key={key}
                    >
                      <div
                        className={`w-full h-[20px] text-[17px] tracking-normal text-[#303f60] opacity-100 line-clamps`}
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
              <div className="mt-40 h-[80vh] flex flex-col items-center justify-center ">
                <Image
                  src="/iconsimgs/write.png"
                  alt=""
                  className="opacity-50 bg-transparent "
                  width={106}
                  height={106}
                />
                <h2 className="w-[292px] h-[23px] text-[#303f60] text-[20px] opacity-80 px-0 py-4 ">
                  Your applied jobs will show here!
                </h2>
                <button
                  className="w-[148px] h-[46px] bg-[#43afff] border border-solid border-[#43afff] rounded-[5px] opacity-100 flex items-center justify-center mt-10 cursor-pointer text-[#ffffff] "
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
        <div className="h-auto">
          <div className="pt-[77rem]">
            <Image
              src="/iconsimgs/left.png"
              alt=""
              onClick={() => decrement()}
              width={30}
              height={30}
            />
            {/* <span className={style.postjobyou_span}>{count}</span> */}
            {count > 1 ? (
              <>
                <div
                  className="h-[30px] w-[30px] rounded-[5px] bg-[#43afff33] text-center text-[19px] font-[400] "
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
                  className="h-[30px] w-[30px] rounded-[5px] bg-[#43afff33] text-center text-[19px] font-[400]"
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
                  className="h-[30px] w-[30px] rounded-[5px] bg-[#43afff33] text-center text-[19px] font-[400]"
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
    </>
  );
};

export default Index;
