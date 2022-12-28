import style from "../postjobyou/Postjobyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";
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
const Index = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [jobData, setJobData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { user } = useContext(authcontext);
  const [myData, setMyData] = useState([]);
  const [loader, setLoader] = useState(true);

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
    try {
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
          setLoader(false);
          console.log("Data : ", resp.data?.data);
          setTotalPage(
            Math.ceil(resp?.data?.metadata?.count / resp?.data?.metadata?.limit)
          );
        });
      });
    } catch (e) {
      // console.log("Error");
      toast.error("Error Found");
    }
  };

  //  const totalJobs = myData?.length;
  const increment = () => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/postjobyou?page=${count + 1}`, undefined, {
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
      router.push(`/postjobyou?page=${count - 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const onNumClick = (e: any) => {
    const numValue = +e.target.innerText;
    console.log(numValue);
    setCount(numValue);
    router.push(`/postjobyou?page=${numValue} `, undefined, {
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
    setLoader(true);
    try {
      let response = await fetch(
        `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${job_id}/candidates`,
        {
          method: "GET",
          headers: { Authorization: `${user?.token}` },
        }
      );
      let data = await response.json();
      setJobData(data?.data);
      setLoader(false);
      console.log("Data :", data?.data);
    } catch (e) {
      toast.error("Error Found");
    }
  };

  return (
    <>
      <ToastContainer />
      <Seo title="PostJobYou" />
      <div className={`${style.postedjobyou_header}`}>
        <div className="mainWrapper">
          <div className={`${style.postedjobyou_mytopbar} `}>
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
                {" "}
                <span>Home</span>
              </Link>
            </div>
            <div className={style.postedjobyou_para}>
              <h1>Jobs posted by you</h1>
            </div>
          </div>
        </div>

        {loader ? (
          <Loader />
        ) : myData?.length > 0 ? (
          <div className={`${style.postedjob_allcards}  `}>
            <div className={`${style.postjob_mycard}`}>
              {myData?.map((item: cardTypes, key) => {
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
        ) : (
          <>
            <Seo title="PostedJob" />

            <div className={style.postedjob_section}>
              <Image
                src="/iconsimgs/write.png"
                alt=""
                className={style.postedjob_img}
                width={106}
                height={106}
              />
              <h2 className={style.postedjob_h2}>
                Your posted jobs will show here!
              </h2>
              <button
                className={style.postjob_btn}
                onClick={() => router.push("/jobpost")}
              >
                Post a Job
              </button>
            </div>
          </>
        )}
      </div>

      {myData?.length > 0 && (
        <div className={style.postedjobyou_section}>
          <div className={style.postedjobyou_footers}>
            <Image
              src="/iconsimgs/left.png"
              alt=""
              onClick={() => decrement()}
              width={30}
              height={30}
            />
            {(count + 2 >= totalPage
              ? [totalPage - 2, totalPage - 1, totalPage]
              : [count, count + 1, count + 2]
            )?.map((i, key) => {
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
      {isOpen && (
        <>
          <div className={style.modalWrapper} onClick={() => setIsOpen(false)}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
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
                {loader ? (
                  <Loader />
                ) : jobData ? (
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
                      <Image
                        src="/iconsimgs/resume.png"
                        alt=""
                        className={style.modalimgs}
                        width={100}
                        height={106}
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

export default Index;
