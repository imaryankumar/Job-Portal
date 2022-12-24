import style from "../postjobyou/Postjobyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";

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
const index = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  console.log(Number(router.query.page), count);
  const [myCanData, setCanMyData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);

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
    return Array(totalPage)
      .fill("")
      .map((e, index) => index + 1);
  }, [totalPage]);

  const reloadData = (page: number) => {
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
        console.log("resp.data :", resp.data);
        setTotalPage(
          Math.ceil(resp?.metadata?.count / resp?.metadata?.limit) % 20
        );
      });
    });
  };
  const increment = () => {
    count < totalPage && setCount(count + 1);
    router.push(`/jobforyou?page=${count + 1} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const decrement = () => {
    count == 1 ? setCount(1) : setCount(count - 1);
    router.push(`/jobforyou?page=${count - 1}`, undefined, { shallow: true });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const onNumClick = (e: any) => {
    const numValue = +e.target.innerText;
    console.log(numValue);
    setCount(numValue);
    router.push(`/jobforyou?page=${numValue} `, undefined, {
      shallow: true,
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const clickMe = (id: string) => {
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
  };

  return (
    <>
      <Seo title="JobForYou" />
      <ToastContainer />
      <div className={style.postedjobyou_header}>
        <div className={style.postedjobyou_topbar}>
          <Link href={"/"}>
            <img src="iconsimgs/homeicon.png" alt="" />
          </Link>
          <span>Home</span>
        </div>
        <div className={style.postedjobyou_para}>
          <h1>Jobs for you</h1>
        </div>
        <div className={style.postedjob_allcards}>
          <div className={style.postjob_mycard}>
            {myCanData.map((item: cardTypes, key) => {
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
                      <img src="iconsimgs/mypin.png" alt="" />
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
            })}
          </div>
        </div>
      </div>
      <div className={style.postedjobyou_section}>
        <div className={style.postedjobyou_footers}>
          <img src="iconsimgs/left.png" alt="" onClick={() => decrement()} />
          {myArray.map((i, k) => {
            return (
              <span
                className={style.postjobyou_span}
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
                key={k}
              >
                {i}
              </span>
            );
          })}

          <img src="iconsimgs/right.png" alt="" onClick={() => increment()} />
        </div>
      </div>
    </>
  );
};

export default index;
