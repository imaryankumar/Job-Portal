import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Fields from "../../components/common/fields/Fields";
import Description from "../../components/description/Description";
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
  function validateTitle(title: string) {
    if (!title) {
      setErrorState("title", "Title is required");
      return true;
    } else {
      setErrorState("title", false);
      return false;
    }
  }
  function validateDesc(description: string) {
    if (!description) {
      setErrorState("description", "Description is required");
      return true;
    } else {
      setErrorState("description", false);
      return false;
    }
  }
  function validateLoc(location: string) {
    if (!location) {
      setErrorState("location", "Location is required");
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
          setLoader(false);
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

      <div className="bg-dark-blue w-full h-[40vh] text-white relative ">
        <div className="mainWrapper">
        <Link href={"/postjobyou"}>
          <div className="flex md:py-4 md:px-48 xs:px-20 px-32 py-6 ">
            
              <Image
                src="/iconsimgs/homemd.svg"
                alt="Homeicon"
                width={10}
                height={9}
                className="mr-2"
              />
            
            
            <span className="text-[12px] font-medium cursor-pointer ">
              Home &gt; <Link href={"jobpost"}>Post a Job</Link> 
            </span>
            
          </div>
          </Link>
        </div>
        <div className="mainWrapper">
          <div className="flex items-center justify-center md:pt-12 pt-4">
            <div className="md:w-[557px] w-[470px] xs:w-[310px] h-[506px] bg-white box-shadows rounded-[20px] flex flex-col items-center justify-center  ">
              <div className=" xs:w-[290px] md:w-[500px] w-[430px]">
                <div className="px-0 py-4">
                  <h1 className="text-light-dark text-[22px] font-medium tracking-normal  ">
                    Post a Job{" "}
                  </h1>
                </div>

                <form
                  className=" md:w-[500px] w-[430px] xs:w-[290px] "
                  onSubmit={(e) => JustonClick(e)}
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
                    }}
                    onBlur={() => {
                      validateTitle(title);
                    }}
                    required
                  >
                    {error && (
                      <p className="text-[#FF0000] text-right  text-xs opacity-[80%] ">
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
                    }}
                    onBlur={() => {
                      validateDesc(description);
                    }}
                    error={error?.description ? true : false}
                    required
                  />
                  {error && (
                    <p className="text-[#FF0000] text-right mt-[-5px] h-2 text-xs opacity-[80%]">
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
                    }}
                    onBlur={() => {
                      validateLoc(location);
                    }}
                    required
                  >
                    {error && (
                      <p className="text-[#FF0000] text-right  text-xs opacity-[80%]">
                        {error.location}
                      </p>
                    )}
                  </Fields>
                  <div className="flex items-center justify-center pb-[20px] ">
                    <button
                      className="w-40 h-[46px]  bg-light-blue border border-solid border-light-blue rounded  text-[16px] font-medium flex items-center justify-center mt-4 cursor-pointer text-white "
                      disabled={isLoading}
                      type="submit"
                      style={
                        isLoading
                          ? { backgroundColor: "white", color: "black" }
                          : { backgroundColor: "light-blue" }
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
      <div className="bg-white-blue w-full"></div>
    </>
  );
};

export default Index;
