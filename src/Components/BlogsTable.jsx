import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  ArrowLeft,
  ArrowRight,
  SearchOutline,
  FilterOutline,
} from "heroicons-react";
import { Paginated, GetPaginatedData } from "./Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../../node_modules/react-loading-skeleton/dist/skeleton.css";

const CoursesTable = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="cflexss w-full gap-[30px] px-[2%] mobile:px-0 font-inter">
        <div className="w-full text-[32px] font-bold text-[#000000] flexss">
          <p>Blogs</p>
        </div>
        <div className="w-full cflexss gap-[20px]">
          <div className="w-full flexbm flex-wrap gap-[20px]">
            <div className="flexsm mobile:w-full gap-[20px]">
              <form className="w-[308px] mobile:w-full rounded-[6px] px-[12px] py-[8px] flexsm gap-[12px] hover:border-blue-600 border-[1px] border-transparent bg-[#f5f5f5] shadow-sm">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-full bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchOutline size={25} />
              </form>
              <div className="flexmm p-[10px] cursor-pointer hover:bg-blue-500/20 rounded-[5px]">
                <FilterOutline size={20} />
              </div>
            </div>
          </div>
          <TableOfBlogs blogs={blogs} searchQuery={searchQuery} navigate={navigate}/>
        </div>
      </div>
    </>
  );
};

export default CoursesTable;

const TableOfBlogs = ({ blogs, searchQuery, navigate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const PAGINATION = 10;
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    // Fetch and display data for the selected page
  };

  useEffect(() => {
    if (blogs.length > 0) {
      setPageCount(Paginated(blogs, PAGINATION));
    }
  }, [blogs]);

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <table className="w-full overflow-x-scroll font-normal text-[12px] p-0 m-0">
        {blogs?.length > 0 && (
          <>
            <tbody className="w-full cflexss gap-[20px]">
              {GetPaginatedData(currentPage, PAGINATION, filteredBlogs).map(
                (blog, index) => {
                  return (
                    <>
                      <div
                        className="cursor-pointer w-[85%] bg-white hover:bg-[#EEEEEE] flexss gap-[10px] rounded-[10px] shadow-md border-[1px] p-[10px] transtion-all duration-150"
                        key={index}
                        onClick={() => {
                          navigate(`/blogs/${blog.id}`);
                        }}
                      >
                        <img
                          src={blog.image}
                          alt={`${blog.title}-${index + 1}`}
                          className="min-w-[164px] h-[116px] rounded-[20px]"
                        />
                        <div
                          className="cflexss gap-[14px] text-start"
                          style={{ width: "calc(100% - 200px)" }}
                        >
                          <p className="font-medium text-[16px]">
                            {blog.title}
                          </p>
                          <p className="font-normal text-[14px] line-clamp-3">
                            {blog.description}
                          </p>
                        </div>
                        <div className="flexmm"></div>{" "}
                      </div>
                    </>
                  );
                }
              )}
            </tbody>
          </>
        )}
      </table>
      {blogs.length === 0 && (
        <div className="w-full">
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#cacecf">
            {new Array(6).fill().map((x, index) => (
              <Skeleton
                key={index}
                containerClassName="w-full h-[80px] rounded-[10px]"
                className="w-full h-[100vh]"
                width={"100%"}
                height={"150px"}
                borderRadius={"10px"}
              />
            ))}
          </SkeletonTheme>
        </div>
      )}
      <div className="w-full flexem mt-[10px]">
        <ReactPaginate
          previousLabel={<ArrowLeft size="20px" />}
          previousClassName={"p-[10px] border-[2px] rounded-l-[10px]"}
          nextClassName={"p-[10px] border-[2px] rounded-r-[10px]"}
          nextLabel={<ArrowRight size="20px" />}
          breakLabel={"..."}
          breakClassName={"w-full p-[10px]"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageClassName={"px-[20px] py-[10px] border-[2px]"}
          onPageChange={handlePageClick}
          containerClassName={"text-[14px] lg:text-[12px] flexem"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};
