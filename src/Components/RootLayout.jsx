import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ArrowRight } from "heroicons-react";
import { BiEditAlt } from "react-icons/bi";

const RootLayout = () => {
  return (
    <>
      <div className="w-full flexbs h-full">
        <div className="w-[216px] h-full fixed top-0 left-0 overflow-y-auto px-[30px] py-[33px] cflexsm gap-[40px] border-r-[2px] bg-white">
          <Link to="/overview">
            <img
              src="/logo.svg"
              alt="dashboard-logo"
              className="w-[100px] h-[100px] cursor-pointer"
            />
          </Link>
          <div className="w-full cflexsm gap-[24px]">
            <Link to="/add-product">
              <div className="w-[155px] text-[12px] flexsm rounded-[3px] gap-[12px] text-white px-[15px] py-[28px] bg-[#066B63] cursor-pointer">
                <img
                  src="/gala_add.svg"
                  alt="gala_add"
                  className="w-[30px] h-[30px]"
                />
                <p>Add Product</p>
              </div>
            </Link>

            <Link to="/products">
              <div className="w-[155px] text-[12px] flexsm rounded-[3px] gap-[12px] text-white px-[15px] py-[28px] bg-[#066B63] cursor-pointer">
                <img
                  src="/deleteProduct.svg"
                  alt="deleteProduct"
                  className="w-[30px] h-[30px]"
                />
                <p>Edit / Delete Product</p>
              </div>
            </Link>

            <Link to="/add-blog">
              <div className="w-[155px] text-[12px] flexsm rounded-[3px] gap-[12px] text-white px-[15px] py-[28px] bg-[#066B63] cursor-pointer">
                <img
                  src="/carbon_blog.svg"
                  alt="carbon_blog"
                  className="w-[30px] h-[30px]"
                />
                <p>Add Blog</p>
              </div>
            </Link>

            <Link to="/blogs">
              <div className="w-[155px] text-[12px] flexsm rounded-[3px] gap-[12px] text-white px-[15px] py-[28px] bg-[#066B63] cursor-pointer">
                <BiEditAlt size="30" />
                <p>Edit / Delete Blog</p>
              </div>
            </Link>

            <Link
              to="/orders"
              className="w-full flexmm gap-[5px] text-[16px] underline italic"
            >
              <p>View Orders</p>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div
          className="ml-[216px] w-full h-full"
          style={{ width: "calc(100% - 236px)" }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default RootLayout;
