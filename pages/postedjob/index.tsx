import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../../components/nexthead/Seo";
import style from "../postedjob/Postedjob.module.css";
import Image from "next/image";
const Index = () => {
  const router = useRouter();
  return (
    <>
      <Seo title="PostedJob" />

      <div className={style.postedjob_header}>
        <div className={style.postedjob_topbar}>
          <Link href={"/"}>
            <Image src="/iconsimgs/homeicon.png" alt="" width={10} height={9} />
          </Link>
          <span>Home</span>
        </div>
        <div className={style.postedjob_para}>
          <h1>Jobs posted by you</h1>
        </div>
      </div>
      <div className={style.postedjob_section}>
        <Image
          src="/iconsimgs/write.png"
          alt=""
          className={style.postedjob_img}
          width={106}
          height={106}
        />
        <h2 className={style.postedjob_h2}>Your posted jobs will show here!</h2>
        <button
          className={style.postjob_btn}
          onClick={() => router.push("jobpost")}
        >
          Post a Job
        </button>
      </div>
    </>
  );
};

export default Index;
