import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  ArrowLeft,
  ArrowRight,
  SearchOutline,
  FilterOutline,
  ChevronUpOutline,
  ChevronDownOutline
} from "heroicons-react";
import { Paginated, GetPaginatedData } from "../Components/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../../node_modules/react-loading-skeleton/dist/skeleton.css";
// import MoveArticle from "../../components/MoveArticle";
import Button from "./Button";
// import { reorderArticle } from "../../services/request";

const CoursesTable = ({ courses, setCourses, title }) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {isOpenModal && modalContent}
      <div className="cflexss w-full gap-[30px] px-[2%] mobile:px-0 font-inter">
        <div className="w-full text-3xl mobile:text-[23px] font-semibold text-[#232323] flexss">
          <p>{title}</p>
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
            <Button
              title="Add Course"
              btnStyle="bg-blue-600/90 hover:bg-blue-600 px-[22px] py-[10px] rounded-[7px] text-[14px] text-white"
              click={() => {
                navigate("/trainer-courses/edit")
              }}
            />
          </div>
          <TableOfCourses
            courses={courses}
            setCourses={setCourses}
            // setArticle={setArticle}
            // setContent={setContent}
            searchQuery={searchQuery}
            setIsOpenModal={setIsOpenModal}
            setModalContent={setModalContent}
          />
        </div>
      </div>
    </>
  );
};

export default CoursesTable;

const TableOfCourses = ({
  courses,
  setCourses,
  // setArticle,
  // setContent,
  searchQuery,
}) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const PAGINATION = 5;
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    // Fetch and display data for the selected page
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const articleReorder = async (newItems) => {
    let alpsToken = localStorage.getItem("alpsToken");
    let customized = [];
    for (let i = 0; i < newItems.length; i++) {
      customized.push({
        id: newItems[i].id,
        order: i + 1,
      });
    }    
  };

  const onDrop = (e, newIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newItems = [...courses];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(newIndex, 0, removed);
    setCourses(newItems);
    articleReorder(newItems);
  };
  useEffect(() => {
    if (courses.length > 0) {
      setPageCount(Paginated(courses, PAGINATION));
    }
  }, [courses]);

  const filteredcourses = courses?.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <table className="w-full overflow-x-scroll p-0 m-0">
        <thead scope="column" className="w-full text-[14px]">
          <tr className="w-full overflow-x-scroll px-[10px] border-b-[1px] border-black font-semibold bg-[#F5F5F5] rounded-[6px]">
            <td className="px-[24px] py-[16px] flexsm font-[600] gap-[16px]">
              <input
                type="checkbox"
                className="rounded-[4px] w-[24px] h-[24px] font-[600]"
              />
              <div className="flexmm gap-[10px]">
                <p>Course</p>
                <ChevronUpOutline size={16} />
              </div>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Code</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Category</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Price</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Last updated on</p>
            </td>
          </tr>
        </thead>
        {courses.length > 0 && (
          <>
            <tbody className="w-full">
              {GetPaginatedData(currentPage, PAGINATION, filteredcourses).map(
                (article, index) => {
                  return (
                    <>
                      <tr
                        key={index}
                        draggable
                        onDragStart={(e) => onDragStart(e, index)}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, index)}
                        className="cursor-pointer border-b-[1px] bg-white hover:bg-[#F5F5F5]"
                        onClick={() => {
                          // setArticle(article);
                          // setContent("create article");
                        }}
                      >
                        <td className="px-[24px] flexsm gap-[16px] py-[16px]">
                          <img
                            src="/move1.svg"
                            alt="move-icon"
                            draggable={false}
                          />
                          <p>{article.title}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <div className="flexsm gap-[8px] capitalize">
                            <div
                              className={`w-[8px] h-[8px] rounded-full ${
                                article.status === "published" && "bg-[#22C55E]"
                              } ${
                                article.status === "draft" && "bg-yellow-400"
                              } ${
                                article.status === "archived" && "bg-red-600"
                              }`}
                            />
                            <p className="capitalize">{article.status}</p>
                          </div>
                        </td>
                        <td className="px-[24px] font-[700] py-[16px]">
                          <p>{article.views}</p>
                        </td>
                        <td className="px-[24px] font-[700] py-[16px]">
                          <p>{article.upVoteCount}</p>
                        </td>
                        <td className="px-[24px] font-[700] py-[16px] flexbm gap-[16px]">
                          <p>{article.downVoteCount}</p>
                        </td>
                      </tr>
                    </>
                  );
                }
              )}
            </tbody>
          </>
        )}
      </table>
      {courses.length === 0 && (
        <div className="w-full">
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#cacecf">
            {new Array(6).fill().map((x, index) => (
              <Skeleton
                key={index}
                containerClassName="w-full h-[80px] rounded-[10px]"
                className="w-full h-[100vh]"
                width={"100%"}
                height={"45px"}
                borderRadius={"5px"}
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
