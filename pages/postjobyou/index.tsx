import style from "../postjobyou/Postjobyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
  email?: any;
}
interface jobData {
  email: string;
  name: string;
  skills: string;
  id: string;
}
const index = () => {
  const [count, setCount] = useState(1);
  const [showPerPage] = useState(12);
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage });
  const [isOpen, setIsOpen] = useState(false);
  const [jobData, setJobData] = useState<jobData[]>([]);
  const { user } = useContext(authcontext);

  console.log("posted job you", user);
  useEffect(() => {
    const value = showPerPage * count;
    setPagination({ start: value - showPerPage, end: value });
    const user = localStorage.getItem("user");
    // console.log("accessToken", JSON.parse(user || "{}").token);
  }, [count]);

  const [myData, setMyData] = useState([]);
  useEffect(() => {
    fetch("https://jobs-api.squareboat.info/api/v1/recruiters/jobs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user") || "{}")?.token,
      },
    }).then((res) => {
      res.json().then((resp) => {
        setMyData(resp.data?.data);
        // console.log(resp.data);
      });
    });
  }, []);
  const totalJobs = myData?.length;
  const totalPage = Math.ceil(totalJobs / showPerPage);
  // console.log({ totalPage });
  const increment = () => {
    count < totalPage && setCount(count + 1);
  };
  const decrement = () => {
    count == 1 ? setCount(1) : setCount(count - 1);
  };
  const postClick = async (job_id: string | undefined) => {
    console.log({ job_id });
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
    let response = await fetch(
      `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${job_id}/candidates`,
      {
        method: "GET",
        headers: { Authorization: `${user?.token}` },
      }
    );
    let data = await response.json();
    setJobData(data?.data);
  };

  return (
    <>
      <div className={style.postedjobyou_header}>
        <div className={style.postedjobyou_topbar}>
          <Link href={"/"}>
            <img src="iconsimgs/homeicon.png" alt="" />
          </Link>
          <span>Home</span>
        </div>
        <div className={style.postedjobyou_para}>
          <h1>Jobs posted by you</h1>
        </div>
        <div className={style.postedjob_allcards}>
          <div className={style.postjob_mycard}>
            {myData
              ?.slice(pagination.start, pagination.end)
              .map((item: cardTypes, key) => {
                //  console.log("id", item.id);
                return (
                  <div className={style.postjoballcards} key={key}>
                    <div className={style.postjobmycard_heading} key={key}>
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
                          className={`${style.postjobmycard_btn} ${style.open}`}
                          onClick={() => postClick(item.id)}
                        >
                          View applications
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
          <span className={style.postjobyou_span}>{count}</span>
          <img src="iconsimgs/right.png" alt="" onClick={() => increment()} />
        </div>
      </div>
      {isOpen && (
        <>
          <div className={style.modalWrapper}>
            <div className={style.modal}>
              <div className={style.wrapmodle}>
                <h2>Applicants for this job</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className={style.close}
                >
                  X
                </button>
              </div>
              <hr />
              <h3 className={style.modal_h3}>
                Total {jobData ? jobData.length : 0} applications
              </h3>
              <div className={style.modal_cards}>
                {jobData ? (
                  jobData?.map((items: cardTypes, k) => {
                    return (
                      <div key={k}>
                        <p style={{ color: "red" }}>{items.email}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className={style.modalempty_div}>
                    <div className={style.modalempty_content}>
                      <img
                        src="iconsimgs/resume.png"
                        alt=""
                        className={style.modalimgs}
                      />
                      <h3>No applications available!</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default index;
