import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import Description from "../../components/description/Description";
import style from "../jobpost/jobpost.module.css";
import Seo from "../../components/nexthead/Seo";
import Image from "next/image";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

interface dataType {
  success?: boolean;
  code: number;
  errors?: any[];
}
const Index = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [error, setError] = useState<{
    title?: string;
    description?: string;
    location?: string;
  }>();
  const router = useRouter();
  const [isLoading, setISLoading] = useState(false);
  const setErrorState = (key: string, value: any) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const validateForm = async () => {
    let titleError = false;
    let descError = false;
    let locationError = false;
    if (!title) {
      setErrorState("title", "Title is required");
      titleError = true;
    } else {
      setErrorState("title", false);
      titleError = false;
    }

    if (!description) {
      setErrorState("description", "Description is required");
      descError = true;
    } else {
      setErrorState("description", false);
      descError = false;
    }

    if (!location) {
      setErrorState("location", "Location is required");
      titleError = true;
    } else {
      setErrorState("location", false);
      titleError = false;
    }

    return titleError || descError || locationError;
  };
  const JustonClick = async (e: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      const body = {
        title: title,
        description: description,
        location: location,
      };
      setISLoading(true);
      setLoader(true);
      fetch("https://jobs-api.squareboat.info/api/v1/jobs/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("user") || "{}")
            ?.token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((finalRes) => {
          if (finalRes.success) {
            setData(finalRes);
            setISLoading(true);
            router.push("/postjobyou");
          } else {
            setISLoading(true);
            setError({});
            if (finalRes?.message) {
              toast.error(finalRes.message);
            } else {
              const errors = finalRes?.errors;

              errors.forEach((item: any) => {
                setError((prev) => ({
                  ...prev,
                  [Object.keys(item)[0]]: Object.values(item)[0],
                }));
              });
            }
          }
        })
        .catch((e) => {
          toast.error(e);
          toast.error("Error Found");
          setISLoading(false);
        })
        .finally(() => {
          setISLoading(false);
          setLoader(false);
        });
    }
  };

  return (
    <>
      <Seo title="JobPost" />

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
                    error={error?.title ? true : false}
                    content="Job title"
                    placeholder="Enter job title"
                    value={title}
                    onchange={setTitle}
                    required
                  />
                  {error && (
                    <p className={style.jobpost_errorpara}>{error.title}</p>
                  )}
                  <Description
                    type="text"
                    content="Description"
                    placeholder="Enter job description"
                    value={description}
                    onchange={setDescription}
                    error={error?.description ? true : false}
                    required
                  />
                  {error && (
                    <p className={style.jobpost_errorpara}>
                      {error.description}
                    </p>
                  )}
                  <Fields
                    type="text"
                    error={error?.location ? true : false}
                    content="Location"
                    placeholder="Enter location"
                    value={location}
                    onchange={setLocation}
                    required
                  />
                  {error && (
                    <p className={style.jobpost_errorpara}>{error.location}</p>
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
                      {loader ? <Loader /> : "Post"}
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
