import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="w-full cflexss py-[36px] px-[10%] gap-[18px]">
        <div className="w-full flexmm">
          <img
            src="/logo.svg"
            alt="dashboard-logo"
            className="w-[122px] h-[119px]"
          />
        </div>
        <div className="w-full cflexmm gap-[7px]">
          <p className="text-[24px]">Hello Alora</p>
          <p className="text-[18px] italic">
            What would we be starting on today ?{" "}
          </p>
        </div>
        <div className="w-full flexbm mt-[20px]">
          <div className="cflexmm gap-[14px]">
            <p className="text-[18px] italic lowercase">
              Add A NEW PRODUCT TO YOUR COLLECTION
            </p>
            <Link to="/add-product">
              <div className="w-[517px] text-[24px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <img
                  src="/gala_add.svg"
                  alt="gala_add"
                  className="w-[125px] h-[125px]"
                />
                <p>Add Product</p>
              </div>
            </Link>
          </div>

          <div className="cflexmm gap-[14px]">
            <p className="text-[18px] italic lowercase">add a new blog/Story</p>
            <Link to="/add-blog">
              <div className="w-[517px] text-[24px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <img
                  src="/carbon_blog.svg"
                  alt="carbon_blog"
                  className="w-[125px] h-[125px]"
                />
                <p>Add Blog</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
