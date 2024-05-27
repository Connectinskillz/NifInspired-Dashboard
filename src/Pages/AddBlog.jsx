import React, { useRef, useState, useEffect } from "react";
import { Check } from "heroicons-react";
import Congratulate from "../Components/Congratulate";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const AddBlog = () => {
  const top = useRef(null);
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
    scrollToRef(top);
  }, []);
  return (
    <>
      <div
        className="w-full cflexss gap-[52px] h-full overflow-y-auto"
        ref={top}
      >
        {submited && <Congratulate setSubmited={setSubmited} type="blog" />}
        <p className="text-[24px] capitalize">Let’s get Writing Alora</p>
        <form className="flexbm gap-[70px] h-full">
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

          <div className="cflexms h-full gap-[174px]">
            <div className="w-[456px]">
              <div className="w-full h-[320px] text-[16px] cflexmm border-dashed border-[2px] rounded-[10px] border-black/70 gap-[12px]">
                <img
                  src="/img.svg"
                  alt="image-placeholder"
                  className="w-[78px] h-[78px] cursor-pointer"
                />
                <p>Add Blog Cover </p>
              </div>
              <div className="w-full flexbm p-[6px]">
                <p>Image name</p>
                <Check size="24px" />
              </div>
            </div>
            <button className="w-full rounded-full text-[24px] font-bold text-white  py-[22px] bg-accent flexmm">
              <p>Add Blog</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
