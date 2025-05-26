import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, deleteBlog } from "../Services/request";
import { SearchOutline, FilterOutline } from "heroicons-react";
import BlogsTable from "../Components/BlogsTable";
import { SpinnerCircular } from "spinners-react";

const ViewBlogs = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [deleting, setDeleting] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const data = await fetchBlogs();
    console.log(data);
    if (data) {
      setBlogs(data);
    }
  };

  const handleDeleteBlog = async (id) => {
    setDeleting([...deleting, id]);
    let token = localStorage.getItem("nifInspiredToken");
    if (token) {
      let data = await deleteBlog(token, id);
      if (data) {
        console.log(data);
        setDeleting(deleting.filter((item) => item !== id));
        setSelected(selected.filter((item) => item.id !== id));
        getBlogs();
      }
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
      <div className="px-[20px] py-[50px] flexss w-full">
        <BlogsTable
          blogs={blogs}
          setBlogs={setBlogs}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="fixed top-0 right-0 w-[340px] pt-[80px] pb-[100px] font-bold text-[30px] border-l-[2px] cflexss px-[25px] h-[100vh] gap-[25px] overflow-y-auto">
          <p>Selected ({selected.length}) </p>
          {/* <Product
            item={selected.length > 0 ? selected : ""}
            selected={selected}
            setSelected={setSelected}
          /> */}

          {selected.length > 0 &&
            selected.map((blog, index) => (
              <div className="w-full cflexss gap-[20px] shadow-md border-[1px] p-[10px] transtion-all duration-150 rounded-[20px]">
                <img
                  src={blog.image}
                  alt={`${blog.title}-${index + 1}`}
                  className="w-full h-[180px] rounded-[20px]"
                />
                <div className="w-full cflexss gap-[14px] text-start">
                  <p className="font-medium text-[16px]">{blog.title}</p>
                  <p className="font-normal text-[14px] line-clamp-3">
                    {blog.description}
                  </p>
                </div>
                <div
                  className={`w-full text-white rounded-full text-[16px] font-bold px-[15px] py-[12px] flexmm cursor-pointer bg-[#BB0000] hover:bg-[#BB0000]/90`}
                  onClick={() => {
                    handleDeleteBlog(blog.id);
                  }}
                >
                  {deleting.find((item) => item === blog.id) ? (
                    <div className="flexmm gap-[5px]">
                      <SpinnerCircular
                        color="#000000"
                        className="mr-4"
                        secondaryColor={"#ffffff"}
                        size={25}
                        thickness={150}
                      />
                      <p>Deleting...</p>
                    </div>
                  ) : (
                    <p>Delete</p>
                  )}
                  {/* <p>Delete</p> */}
                </div>
              </div>
            ))}

          {/* <div
            className={`fixed bottom-[10px] right-[10px] z-50 w-[320px] text-white rounded-full text-[24px] font-bold p-[15px] flexmm ${
              selected.length > 0
                ? "cursor-pointer bg-[#BB0000]"
                : "cursor-not-allowed bg-[#BB0000]/40"
            } hover:bg-[#BB0000]/90`}
            onClick={handleDeleteBlogs}
          >
            {deleting ? (
              <SpinnerCircular
                color="#000000"
                className="mr-4"
                secondaryColor={"#ffffff"}
                size={50}
                thickness={150}
              />
            ) : (
              <p>Delete</p>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ViewBlogs;
