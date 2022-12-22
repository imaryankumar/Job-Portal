import style from "../postjobyou/Postjobyou.module.css";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { authcontext } from "../../components/contextapi/ContextAPI";

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
  const [myCanData, setCanMyData] = useState<jobData[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { user } = useContext(authcontext);
  console.log("totalPage", totalPage);
  let myArray = useMemo(() => {
    return Array(totalPage)
      .fill("")
      .map((e, index) => index + 1);
  }, [totalPage]);

  //  console.log(myArray);
  useEffect(() => {
    // const token = user?.token ? user?.token : "";
    fetch("https://jobs-api.squareboat.info/api/v1/candidates/jobs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user") || "{}")?.token,
      },
    }).then((res) => {
      res.json().then((resp) => {
        setCanMyData(resp.data);

        setTotalPage(
          Math.ceil(resp?.metadata?.count / resp?.metadata?.limit) % 20
        );
        //  console.log("mydata", resp?.metadata?.count, resp?.metadata?.limit);
      });
    });
  }, [count]);

  // const totalJobs = myCanData?.length;
  const increment = () => {
    count < totalPage && setCount(count + 1);
  };
  const decrement = () => {
    count == 1 ? setCount(1) : setCount(count - 1);
  };
  const postClick = () => {
    console.log("Hello");
  };
  //  console.log({ myCanData });
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
                        onClick={() => postClick()}
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
              <span className={style.postjobyou_span} key={k}>
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
