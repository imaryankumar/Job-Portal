import style from "../jobappliedyou/Jobappliedyou.module.css";
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
      <div className={style.jobappliedyou_header}>
        <div className={style.jobapplied_bars}>
          <div className={style.jobappliedyou_topbar}>
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
          <div className={style.jobappliedyou_para}>
            <h1>Jobs applied by you</h1>
          </div>
        </div>
        {myCanData?.length > 0 ? (
          <div className={style.postedjob_allcards}>
            <div className={style.postjob_mycard}>
              {myCanData
                ?.slice(pagination.start, pagination.end)
                .map((item: cardTypes, key) => {
                  return (
                    <div className={style.postjoballcards} key={key}>
                      <div
                        className={`${style.postjobmycard_heading} ${style.line_clamp}`}
                        key={key}
                      >
                        <h1>{item.title}</h1>
                      </div>
                      <div
                        className={`${style.postjobmycard_para} ${style.line_clamp}`}
                      >
                        <p>{item.description}</p>
                      </div>
                      <div className={style.postjobmycard_locsection}>
                        <div className={style.postjobmycard_locationcard}>
                          <Image
                            src="/iconsimgs/mypin.png"
                            alt=""
                            width={10}
                            height={15}
                          />
                          <h3
                            className={`${style.postjobmycard_h3} ${style.line_clamps}`}
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
              <div className={style.jobapply_section}>
                <Image
                  src="/iconsimgs/write.png"
                  alt=""
                  className={style.jobapply_img}
                  width={106}
                  height={106}
                />
                <h2 className={style.jobapply_h2}>
                  Your applied jobs will show here!
                </h2>
                <button
                  className={style.jobapply_btn}
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
        <div className={style.jobappliedyou_section}>
          <div className={style.jobappliedyou_footers}>
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
                  className={style.postjobyou_span}
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
                  className={style.postjobyou_span}
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
                  className={style.postjobyou_span}
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
