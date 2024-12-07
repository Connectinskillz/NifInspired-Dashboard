import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const HomePage = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("nifInspiredToken");
    if (token) {
      let user = localStorage.getItem("nifInspiredUser");
      user = JSON.parse(user);
      setUser(user);
    } else {
      navigate("/");
    }
  }, []);
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
          <p className="text-[24px]">Hello {user?.name}</p>
          <p className="text-[18px] italic">
            What would we be starting on today ?{" "}
          </p>
        </div>
        <div className="w-full flexbm mt-[20px] gap-[20px]">
          <div className="cflexmm gap-[30px] w-[320px] flex-shrink">
            <p className="text-[18px] italic">
              Add a new product
            </p>
            <Link to="/add-product" className="w-full">
              <div className="w-full text-[20px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <img
                  src="/gala_add.svg"
                  alt="gala_add"
                  className="w-[55px] h-[55px]"
                />
                <p>Add Product</p>
              </div>
            </Link>
          </div>

          <div className="cflexmm gap-[30px] w-[320px] flex-shrink">
            <p className="text-[18px] italic">Edit / Delete a product</p>
            <Link to="/products" className="w-full">
              <div className="w-full text-[20px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <img
                  src="/deleteProduct.svg"
                  alt="deleteProduct"
                  className="w-[55px] h-[55px]"
                />
                <p>Edit / Delete Product</p>
              </div>
            </Link>
          </div>

          <div className="cflexmm gap-[30px] w-[320px] flex-shrink">
            <p className="text-[18px] italic">Add a new blog/Story</p>
            <Link to="/add-blog" className="w-full">
              <div className="w-full text-[20px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <img
                  src="/carbon_blog.svg"
                  alt="carbon_blog"
                  className="w-[55px] h-[55px]"
                />
                <p>Add Blog</p>
              </div>
            </Link>
          </div>

          <div className="cflexmm gap-[30px] w-[320px] flex-shrink">
            <p className="text-[18px] italic">View / Edit blog</p>
            <Link to="/blogs" className="w-full">
              <div className="w-full text-[20px] cflexmm rounded-[10px] gap-[38px] text-white pb-[30px] pt-[95px] bg-[#066B63] cursor-pointer">
                <BiEdit size="55" />
                <p>View / Edit Blog</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
