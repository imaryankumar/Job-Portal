import style from "../jobforyou/Jobsforyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
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
    try {
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
      ).then((res) => {
        res.json().then((resp) => {
          setCanMyData(resp.data);
          setLoader(false);
          console.log("resp.data :", resp.data);
          setTotalPage(
            Math.ceil(resp?.metadata?.count / resp?.metadata?.limit)
          );
        });
      });
    } catch (e) {
      // console.log("Error");
      toast.error("Error Found");
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
    try {
      const getData = async () => {
        const body = {
          jobId: id,
        };
        const res = await fetch(
          "https://jobs-api.squareboat.info/api/v1/candidates/jobs",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: JSON.parse(localStorage.getItem("user") || "{}")
                ?.token,
            },
            body: JSON.stringify(body),
          }
        );
        const showres = await res.json();
        if (showres.success === true) {
          toast.success("Applied Successfull");
          reloadData(count);
        }
      };
      getData();
    } catch (e) {
      // console.log("Error");
      toast.error("Error Found");
    }
  };

  return (
    <>
      <Seo title="JobForYou" />
      <ToastContainer />
      <div className={style.postedjobyou_header}>
        <div className="mainWrapper">
          <div className={style.postedjobyou_mytopbar}>
            <div className={style.postedjobyou_topbar}>
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
            <div className={style.postedjobyou_para}>
              <h1>Jobs for you</h1>
            </div>
          </div>
          <div className={style.postedjob_allcards}>
            <div className={style.postjob_mycard}>
              {loader ? (
                <Loader />
              ) : (
                myCanData?.map((item: cardTypes, key) => {
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
                        <div>
                          <button
                            className={style.postjobmycard_btn}
                            onClick={() => clickMe(item.id)}
                          >
                            Apply
                          </button>
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
      <div className={style.postedjobyou_section}>
        <div className={style.postedjobyou_footers}>
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
    </>
  );
};

export default Index;
