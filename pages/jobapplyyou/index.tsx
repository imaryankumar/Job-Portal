import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../jobapplyyou/Jobapplyyou.module.css";
const index = () => {
  const router = useRouter();
  return (
    <>
      <div className={style.jobapply_header}>
        <div className={style.jobapply_topbar}>
          <Link href={"/"}>
            <img src="iconsimgs/homeicon.png" alt="" />
          </Link>
          Home &gt; Applied Jobs
        </div>
        <div className={style.jobapply_para}>
          <h1>Jobs applied by you</h1>
        </div>
      </div>
      <div className={style.jobapply_section}>
        <img src="iconsimgs/write.png" alt="" className={style.jobapply_img} />
        <h2 className={style.jobapply_h2}>Your applied jobs will show here!</h2>
        <button className={style.jobapply_btn} onClick={() => router.push("")}>
          See all jobs
        </button>
      </div>
    </>
  );
};

export default index;
