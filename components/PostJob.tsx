import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Fields from "./common/fields/Fields";
import Description from "./description/Description";
import Seo from "./nexthead/Seo";
import Image from "next/image";
import { toast } from "react-toastify";
import Router from "next/router";
import Loader from "./Loader/Loader";
type Props = {};

const PostJob = (props: Props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<{
    title?: string;
    description?: string;
    location?: string;
  }>();
  const values = { title, location, description };

  const unSavedChanges = useCallback(() => {
    if (
      values.title.length > 0 ||
      values.description.length > 0 ||
      values.location.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [values]);

  useEffect(() => {
    if (unSavedChanges()) {
      const routeChangeStart = (e: any) => {
        if (redirect) {
          const ok = confirm("Are you sure you want to exit?");
          if (!ok) {
            Router.events.emit("routeChangeError");
            window.history.pushState(null, "post-job", "/post-job");
            throw "Abort route change.";
          }
        }
      };
      Router.events.on("routeChangeStart", routeChangeStart);
      return () => {
        Router.events.off("routeChangeStart", routeChangeStart);
      };
    }
  }, [unSavedChanges, Router, redirect]);

  const router = useRouter();
  const [isLoading, setISLoading] = useState(false);
  const setErrorState = (key: string, value: any) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  function validateTitle(title: string) {
    if (!title || title.trim().length === 0) {
      setErrorState("title", "Title is required");
      return true;
    } else if (title.length === 100) {
      setErrorState("title", "Maximum character limit 100");
      return true;
    } else {
      setErrorState("title", false);
      return false;
    }
  }

  function validateDesc(description: string) {
    if (!description || description.trim().length === 0) {
      setErrorState("description", "Description is required");
      return true;
    } else if (description.length === 1200) {
      setErrorState("description", "Maximum character limit 1200");
      return true;
    } else {
      setErrorState("description", false);
      return false;
    }
  }
  function validateLoc(location: string) {
    if (!location || location.trim().length === 0) {
      setErrorState("location", "Location is required");
      return true;
    } else if (location.length === 100) {
      setErrorState("location", "Maximum character limit 100");
      return true;
    } else {
      setErrorState("location", false);
      return false;
    }
  }
  const validateForm = async () => {
    let titleError = false;
    let descError = false;
    let locationError = false;

    titleError = validateTitle(title);
    descError = validateDesc(description);
    locationError = validateLoc(location);

    return titleError || descError || locationError;
  };
  const postJobHandler = async (e: any) => {
    e.preventDefault();
    if (!(await validateForm())) {
      const body = {
        title: title,
        description: description,
        location: location,
      };
      setISLoading(true);
      setLoader(true);
      setRedirect(false);
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
          setISLoading(false);

          if (finalRes.success) {
            setISLoading(true);
            router.push("/jobs-posted-by-you");
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
          setISLoading(true);
          setLoader(false);
        })
        .finally(() => {
          setISLoading(true);
          setLoader(false);
        });
    }
  };
  return (
    <>
      <Seo title="Post a Job" />

      <div className="bg-dark-blue w-full h-[40vh] text-white relative ">
        <div className="mainWrapper">
          <div className="flex pl-[1rem] md:pl-[12rem] pt-[1rem] ">
            <Link
              href="/jobs-posted-by-you"
              className="text-[12px] font-medium cursor-pointer"
            >
              <Image
                src="/iconsimgs/homemd.svg"
                alt="Homeicon"
                width={10}
                height={9}
                className="inline pb-1"
              />
              <span className="mx-1">Home &gt;</span>
            </Link>

            <span className="text-[12px] font-medium cursor-pointer ">
              <Link href={"post-job"}>Post a Job</Link>
            </span>
          </div>
        </div>
        <div className="mainWrapper">
          <div className="flex items-center justify-center md:pt-12 pt-4 ">
            <div className=" bg-white box-shadows rounded-[20px] flex flex-col items-center justify-center mx-4  ">
              <div>
                <div>
                  <h1 className="text-light-dark text-[22px] font-medium tracking-normal px-6 pt-5 ">
                    Post a Job{" "}
                  </h1>
                </div>

                <form
                  className="px-6 py-2 "
                  onSubmit={(e) => postJobHandler(e)}
                >
                  <Fields
                    type="text"
                    error={error?.title ? true : false}
                    content="Job title"
                    placeholder="Enter job title"
                    value={title}
                    onchange={(value: string) => {
                      setTitle(value);
                      validateTitle(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateTitle(title);
                    }}
                    required
                  >
                    {error && (
                      <p className="text-dark-red text-right  text-xs opacity-[80%] ">
                        {error.title}
                      </p>
                    )}
                  </Fields>
                  <Description
                    type="text"
                    content="Description"
                    placeholder="Enter job description"
                    value={description}
                    onchange={(value: string) => {
                      setDescription(value);
                      validateDesc(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateDesc(description);
                    }}
                    error={error?.description ? true : false}
                    required
                  />
                  {error && (
                    <p className="text-dark-red text-right mt-[-5px] h-2 text-xs opacity-[80%]">
                      {error.description}
                    </p>
                  )}
                  <Fields
                    type="text"
                    error={error?.location ? true : false}
                    content="Location"
                    placeholder="Enter location"
                    value={location}
                    onchange={(value: string) => {
                      setLocation(value);
                      validateLoc(value);
                      setISLoading(false);
                    }}
                    onBlur={() => {
                      validateLoc(location);
                    }}
                    required
                  >
                    {error && (
                      <p className="text-dark-red text-right  text-xs opacity-[80%]">
                        {error.location}
                      </p>
                    )}
                  </Fields>
                  <div className="flex items-center justify-center pb-[20px] ">
                    <button
                      className={`w-40 h-[46px]  bg-light-blue border border-solid border-light-blue rounded  text-[16px] font-medium flex items-center justify-center mt-4 cursor-pointer text-white ${
                        isLoading
                          ? "  bg-light-blue   text-white  cursor-no-drop  "
                          : "bg-light-blue text-white "
                      }`}
                      disabled={isLoading}
                      type="submit"
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
      <div className="bg-white-blue w-full"></div>
    </>
  );
};
export default PostJob;
