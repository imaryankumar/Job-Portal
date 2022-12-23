import style from "../jobappliedyou/Jobappliedyou.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const index = () => {
  const [count, setCount] = useState(1);
  const [showPerPage] = useState(20);
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage });
  const [myCanData, setCanMyData] = useState<jobData[]>([]);

  useEffect(() => {
    const value = showPerPage * count;
    setPagination({ start: value - showPerPage, end: value });
  }, [count]);

  useEffect(() => {
    fetch("https://jobs-api.squareboat.info/api/v1/candidates/jobs/applied", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user") || "{}")?.token,
      },
    }).then((res) => {
      res.json().then((resp) => {
        setCanMyData(resp.data);
      });
    });
  }, []);

  const totalJobs = myCanData?.length;
  const totalPage = Math.ceil(totalJobs / showPerPage);

  const increment = () => {
    count < totalPage && setCount(count + 1);
  };
  const decrement = () => {
    count == 1 ? setCount(1) : setCount(count - 1);
  };

  return (
    <>
      {" "}
      <div className={style.jobappliedyou_header}>
        <div className={style.jobapplied_bars}>
          <div className={style.jobappliedyou_topbar}>
            <Link href={"/"}>
              <img src="iconsimgs/homeicon.png" alt="" />
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
                          <img src="iconsimgs/mypin.png" alt="" />
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
            {" "}
            <div className={style.jobapply_section}>
              <img
                src="iconsimgs/write.png"
                alt=""
                className={style.jobapply_img}
              />
              <h2 className={style.jobapply_h2}>
                Your applied jobs will show here!
              </h2>
              <button className={style.jobapply_btn}>See all jobs</button>
            </div>
          </>
        )}
      </div>
      {myCanData?.length > 0 && (
        <div className={style.jobappliedyou_section}>
          <div className={style.jobappliedyou_footers}>
            <img src="iconsimgs/left.png" alt="" onClick={() => decrement()} />
            <span className={style.postjobyou_span}>{count}</span>
            <img src="iconsimgs/right.png" alt="" onClick={() => increment()} />
          </div>
        </div>
      )}
    </>
  );
};

export default index;
