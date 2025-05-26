import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check } from "heroicons-react";
import Congratulate from "../Components/Congratulate";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import FileBase64 from "react-file-base64";
import { X, ChevronLeftOutline } from "heroicons-react";
import { fetchSingleBlog, editBlog } from "../Services/request";
import Editor from "./Editor";
import { BsEasel3 } from "react-icons/bs";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const EditBlog = () => {
  const top = useRef(null);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [submited, setSubmited] = useState(false);
  const [file, setFile] = useState("");
  const [user, setUser] = useState("");
  const [changing, setChanging] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    id: "",
    title: "",
    description: "",
    blog: "",
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
    let token = localStorage.getItem("nifInspiredToken");
    if (valid) {
      setLoading(true);
      await editBlog(token, blogDetails, setSubmited);
      setLoading(false);
    }
  };

  const OnChangeUploadFile = async (base64) => {
    if (base64.type.startsWith("image/")) {
      setBlogDetails({ ...blogDetails, image: base64.file });
      setFile(base64.base64);
      setChanging(!changing);
    } else {
      alert("Unsupported file type. Please upload an image.");
    }
    console.log(base64);
  };

  const getBlogDetails = async (user) => {
    scrollToRef(top);
    setUser(user);
    let data = await fetchSingleBlog(blogId);
    console.log(data);
    if (data) {
      setBlogDetails({
        id: data?.id,
        title: data?.title,
        description: data?.description,
        blog: data?.blog,
        image: data?.image,
      });
      setFile(data?.image);
      setValid(true);
    }
  };

  useEffect(() => {
    if (
      blogDetails.title &&
      blogDetails.description &&
      blogDetails.blog &&
      blogDetails.image
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
      getBlogDetails(user);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div
        className="w-full pt-[50px] pb-[150px] cflexss px-[20px] gap-[52px] h-full"
        ref={top}
      >
        {submited && (
          <Congratulate
            setSubmited={setSubmited}
            type="edit-blog"
            user={user?.name}
          />
        )}
        <div
          className="rounded-full w-[30px] h-[30px] bg-white shadow-md flexmm cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        >
          <ChevronLeftOutline size={20} />
        </div>
        <form
          className="w-full flexbs gap-[70px] h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-1/2 cflexss gap-[37px] text-[18px]">
            <div>
              <p className="text-[24px] font-bold">Edit Blog </p>
              <p className="font-normal text-[16px]">
                Edit your blog to your taste
              </p>
            </div>
            <div className="w-full">
              <p>Blog title</p>
              <input
                className="w-full px-[20px] py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                type="text"
                name="title"
                onChange={handleChange}
                value={blogDetails?.title}
                placeholder="Blog Title"
              />
            </div>
            <div className="w-full">
              <p>Brief description</p>
              <textarea
                className="w-full px-[20px] h-[112px] resize-none py-[10px] text-[14px] rounded-[9px] border-[2px] outline-none"
                type="text"
                name="description"
                onChange={handleChange}
                value={blogDetails?.description}
                placeholder="Tell us something about your blog"
              />
            </div>
            <div className="w-full cflexss gap-[10px]">
              <p>Blog Body</p>
              <Editor
                blogDetails={blogDetails}
                setBlogDetails={setBlogDetails}
              />
            </div>
          </div>

          <div className="cflexms w-1/2 h-full gap-[120px]">
            <div className="w-full">
              <div
                className={`relative placeholder:w-full ${
                  file ? "h-[450px]" : "h-[320px]"
                } text-[16px] cflexmm border-dashed border-[2px] rounded-[10px] border-black/70 gap-[12px]`}
              >
                {file ? (
                  <>
                    <img
                      src={file}
                      alt="product"
                      className="w-full h-full rounded-[10px] object-cover"
                    />
                    <div className="flexmm absolute top-[10px] right-[10px] z-10 cursor-pointer w-[35px] h-[35px] rounded-full bg-white">
                      <X
                        size="25px"
                        color="black"
                        onClick={() => {
                          setFile("");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="/img.svg"
                      alt="image-placeholder"
                      className="w-[70px] h-[70px] cursor-pointer"
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
                    <p>Save</p>
                  </div>
                ) : (
                  <p>Save</p>
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

export default EditBlog;
