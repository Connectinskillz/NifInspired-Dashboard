import React, { useRef, useState, useEffect } from "react";
import { Check } from "heroicons-react";
import Congratulate from "../Components/Congratulate";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import FileBase64 from "react-file-base64";
import { X } from "heroicons-react";
import { createBlog } from "../Services/request";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const AddBlog = () => {
  const top = useRef(null);
  const navigate = useNavigate();
  const [submited, setSubmited] = useState(false);
  const [user, setUser] = useState("");
  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBlogDetails({ ...blogDetails, [name]: value });
    setChanging(!changing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valid) {
      setLoading(true);
    }
  };

  const OnChangeUploadFile = async (base64) => {
    if (
      base64.type === "image/png" ||
      base64.type === "image/jpg" ||
      base64.type === "image/jpeg" ||
      base64.type === "image/jfif"
    ) {
      setBlogDetails({ ...blogDetails, image: base64 });
      // Call API to upload image to database
    }
    console.log(base64);
  };

  useEffect(() => {
    if (
      blogDetails.title &&
      blogDetails.description &&
      blogDetails.image &&
      blogDetails.category
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [changing]);

  useEffect(() => {
    let token = localStorage.getItem("nifInspiredToken");
    if (token) {
      let user = localStorage.getItem("nifInspiredUser");
      user = JSON.parse(user);
      setUser(user);
      scrollToRef(top);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div
        className="w-full cflexss gap-[52px] h-full overflow-y-auto"
        ref={top}
      >
        {submited && <Congratulate setSubmited={setSubmited} type="blog" />}
        <p className="text-[24px] capitalize">Let’s get Writing {user?.name}</p>
        <form className="flexbs gap-[70px] h-full" onSubmit={handleSubmit}>
          <div className="cflexss gap-[37px] text-[18px]">
            <div>
              <p className="text-[24px] font-bold">Add New Blog </p>
              <p className="font-normal text-[16px]">
                create a new blog available on sale
              </p>
            </div>
            <div className="w-[511px]">
              <p>Blog title</p>
              <input
                className="w-full px-[20px] py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                placeholder="Blog Title"
              />
            </div>
            <div className="w-[511px]">
              <p>Brief description</p>
              <textarea
                className="w-full px-[20px] h-[112px] resize-none py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                placeholder="Tell us something about your blog"
              />
            </div>
            <div className="w-[511px]">
              <p>Blog Body</p>
              {/* <input
                className="w-full px-[20px] py-[10px] rounded-[9px] text-[14px] border-[2px] outline-none"
                placeholder="Add Ingredients"
              /> */}
            </div>
          </div>

          <div className="cflexms h-full mt-[120px] gap-[174px]">
            <div className="w-[456px]">
              <div className="relative placeholder:w-full h-[320px] text-[16px] cflexmm border-dashed border-[2px] rounded-[10px] border-black/70 gap-[12px]">
                {blogDetails.image ? (
                  <>
                    <img
                      src={blogDetails.image.base64}
                      alt="product"
                      className="w-full h-full rounded-[10px] object-cover"
                    />
                    <div className="flexmm absolute top-[10px] right-[10px] z-10 cursor-pointer w-[40px] h-[40px] rounded-full bg-white">
                      <X
                        size="30px"
                        color="black"
                        onClick={() => {
                          setBlogDetails({ ...blogDetails, image: "" });
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="/img.svg"
                      alt="image-placeholder"
                      className="w-[78px] h-[78px] cursor-pointer"
                    />
                    <p>Click to Add product image or Drag and Drop </p>
                    <div className="absolute top-[10px] cflexmm gap-[3px] left-[10%] opacity-0 cursor-pointer">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                        return (
                          <>
                            <FileBase64
                              name="image"
                              defaultValue=""
                              multiple={false}
                              onDone={(base64) => {
                                OnChangeUploadFile(base64);
                              }}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              {blogDetails.image && (
                <>
                  <div className="w-full flexbm p-[6px]">
                    <p>{blogDetails.image.name}</p>
                    <Check size="24px" />
                  </div>
                </>
              )}
            </div>
            <div className="w-full cflexmm gap-[10px]">
              <button
                className={`w-full rounded-full text-[24px] font-bold text-white  py-[22px] ${
                  valid
                    ? "bg-accent cursor-pointer"
                    : "bg-accent/40 cursor-not-allowed"
                } flexmm`}
                type="submit"
              >
                {loading ? (
                  <div className="flexmm gap-[10px] w-full">
                    <Loader />
                    <p>Add Blog</p>
                  </div>
                ) : (
                  <p>Add Blog</p>
                )}
              </button>
              {!valid && (
                <p className="text-[14px] text-red-700">
                  *All fields are required!
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
