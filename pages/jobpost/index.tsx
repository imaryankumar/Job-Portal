import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import Description from "../../components/description/Description";
import style from "../jobpost/jobpost.module.css";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface dataType {
  success?: boolean;
  code: number;
  errors?: any[];
}
const Index = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [isLoading, setISLoading] = useState(false);

  const JustonClick = async (e: any) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
      location: location,
    };

    try {
      const myData = await fetch(
        "https://jobs-api.squareboat.info/api/v1/jobs/",
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
      const finalRes = await myData.json();
      if (finalRes.success) {
        setData(finalRes);
        setISLoading(true);
        router.push("/postjobyou");
      } else {
        setISLoading(true);
        setError(true);
        setTimeout(() => {
          setISLoading(false);
        }, 1000);
      }
    } catch (e) {
      // console.log("Error");
      toast.error("Error Found");
    }
  };

  return (
    <>
      <Seo title="JobPost" />
      <ToastContainer />
      <div className={`${style.header}`}>
        <div className="mainWrapper">
          <div className={`${style.jobpost_topcontent}  `}>
            <Link href={"/"}>
              <Image
                src="/iconsimgs/homeicon.png"
                alt=""
                width={10}
                height={9}
              />
            </Link>
            <span>Home &gt; Post a Job</span>
          </div>
        </div>
        <div className="mainWrapper">
          <div className={`${style.jobpost_allmycard}`}>
            <div className={style.jobpost_card}>
              <div className={style.jobpost_content}>
                <div className={style.jobpost_title}>
                  <h2 className={style.jobpost_h2}>Post a Job </h2>
                </div>

                <form
                  className={style.jobpost_form}
                  onSubmit={(e) => JustonClick(e)}
                >
                  <Fields
                    type="text"
                    error={error ? true : false}
                    content="Job title*"
                    placeholder="Enter job title"
                    value={title}
                    onchange={setTitle}
                  />
                  <Description
                    type="text"
                    content="Description*"
                    placeholder="Enter job description"
                    value={description}
                    onchange={setDescription}
                    error={error ? true : false}
                  />
                  <Fields
                    type="text"
                    error={error ? true : false}
                    content="Location*"
                    placeholder="Enter location"
                    value={location}
                    onchange={setLocation}
                  />
                  {error ? (
                    <p className={style.jobpost_errorpara}>
                      All fields are mandatory.
                    </p>
                  ) : (
                    ""
                  )}
                  <div className={style.jobpost_btns}>
                    <button
                      className={style.jobpost_btn}
                      disabled={isLoading}
                      type="submit"
                      style={
                        isLoading
                          ? { backgroundColor: "white", color: "black" }
                          : { backgroundColor: "#43afff" }
                      }
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.jobpost_section}></div>
    </>
  );
};

export default Index;
