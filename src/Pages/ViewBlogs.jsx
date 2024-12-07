import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../Services/request";
import { SearchOutline, FilterOutline } from "heroicons-react";
import BlogsTable from "../Components/BlogsTable";

const ViewBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const data = await fetchBlogs();
    console.log(data);
    if (data) {
      setBlogs(data);
    }
  };

  useEffect(() => {
    const nifinspiredToken = localStorage.getItem("nifInspiredToken");
    if (nifinspiredToken) {
      getBlogs();
    } else navigate("/");
  }, []);

  return (
    <>
      <div className="px-[20px] w-full">
        <BlogsTable blogs={blogs} setBlogs={setBlogs} />
      </div>
    </>
  );
};

export default ViewBlogs;
