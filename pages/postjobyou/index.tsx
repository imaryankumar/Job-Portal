import style from "../postjobyou/Postjobyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";
import Router, { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";

interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
  email?: any;
  name?: string;
  skills?: string;
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
  const [isOpen, setIsOpen] = useState(false);
  const [jobData, setJobData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { user } = useContext(authcontext);
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const page = router.query?.page ? Number(router.query.page) : 1;
    if (!isNaN(page) && page > 0) {
      setCount(page);
      reloadData(page);
    }
  }, [router]);

  let myArray = useMemo(() => {
    return Array(totalPage)
      .fill("")
      .map((e, index) => index + 1);
  }, [totalPage]);
  console.log("TotalPage", totalPage);
  // useEffect(() => {}, []);
  const reloadData = (page: number) => {
    fetch(
      `https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${page}`,
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
        setMyData(resp.data?.data);
        console.log("Data : ", resp.data?.data);
        setTotalPage(
          Math.ceil(resp?.data?.metadata?.count / resp?.data?.metadata?.limit)
        );
      });
    });
  };

  //  const totalJobs = myData?.length;
  const increment = () => {
    count < totalPage && setCount(count + 1);
    router.push(`/postjobyou?page=${count + 1}`, undefined, { shallow: true });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const decrement = () => {
    count == 1 ? setCount(1) : setCount(count - 1);
    router.push(`/postjobyou?page=${count - 1}`, undefined, { shallow: true });
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
  const postClick = async (job_id: string | undefined) => {
    //  console.log({ job_id });
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
    console.log("Data :", data?.data);
  };

  return (
    <>
      <Seo title="PostJobYou" />
      <div className={`${style.postedjobyou_header} `}>
        <div className={`${style.postedjobyou_mytopbar} mainWrapper`}>
          <div className={style.postedjobyou_topbar}>
            <Link href={"/"}>
              <img src="iconsimgs/homeicon.png" alt="" />
            </Link>
            <span>Home</span>
          </div>
          <div className={style.postedjobyou_para}>
            <h1>Jobs posted by you</h1>
          </div>
        </div>
        <div className={style.postedjob_allcards}>
          <div className={`${style.postjob_mycard} mainWrapper`}>
            {myData.map((item: cardTypes, key) => {
              return (
                <div className={style.postjoballcards} key={key}>
                  <div
                    className={`${style.postjobmycard_heading} ${style.line_clamps}`}
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
          {myArray.map((i, key) => {
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
                key={key}
              >
                {i}
              </span>
            );
          })}

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
                      <div key={k} className={style.modalheader}>
                        <div className={style.modalcards}>
                          <div className={style.modalcard_txts}>
                            <div className={style.modalcard_content}>
                              <span className={style.modalcard_span}>
                                {items.name?.slice(0, 1)}
                              </span>
                              <div className={style.modalcard_word}>
                                <h2 className={style.modalcard_h2}>
                                  {items.name}
                                </h2>
                                <h3 className={style.modalcard_h3}>
                                  {items.email}
                                </h3>
                              </div>
                            </div>

                            <div className={style.modalcard_skills}>
                              <h2 className={style.modalcard_skillsh3}>
                                Skills
                              </h2>
                              <h3 className={style.modalcard_h3}>
                                {items.skills}
                              </h3>
                            </div>
                          </div>
                        </div>
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
