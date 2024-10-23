import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  ArrowLeft,
  ArrowRight,
  SearchOutline,
  FilterOutline,
  ChevronUpOutline,
  ChevronDownOutline,
} from "heroicons-react";
import { Paginated, GetPaginatedData } from "./Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../../node_modules/react-loading-skeleton/dist/skeleton.css";
// import Moveorder from "../../components/Moveorder";
import Button from "./Button";
// import { reorderorder } from "../../services/request";

const CoursesTable = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {isOpenModal && modalContent}
      <div className="cflexss w-full gap-[30px] px-[2%] mobile:px-0 font-inter">
        <div className="w-full text-[32px] font-bold text-[#000000] flexss">
          <p>Orders</p>
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
                navigate("/trainer-courses/edit");
              }}
            />
          </div>
          <TableOfOrders
            orders={orders}
            setOrders={setOrders}
            // setorder={setorder}
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

const TableOfOrders = ({
  orders,
  setOrders,
  // setorder,
  // setContent,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const PAGINATION = 10;
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

  const orderReorder = async (newItems) => {
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
    const newItems = [...orders];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(newIndex, 0, removed);
    setOrders(newItems);
    orderReorder(newItems);
  };
  useEffect(() => {
    if (orders.length > 0) {
      setPageCount(Paginated(orders, PAGINATION));
    }
  }, [orders]);

  const filteredorders = orders?.filter((order) =>
    order.order.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <table className="w-full overflow-x-scroll font-normal text-[12px] p-0 m-0">
        <thead scope="column" className="w-full font-normal">
          <tr className="w-full overflow-x-scroll px-[10px] text-[14px] text-[#066B63] font-bold bg-[#066b631a] rounded-[6px]">
            <td className="px-[24px] py-[16px]">
              <p>Date of order</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Order Id</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Time of order</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Customer</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Order</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Status</p>
            </td>
            <td className="px-[24px] py-[16px]">
              <p>Delivery Status</p>
            </td>
          </tr>
        </thead>
        {orders.length > 0 && (
          <>
            <tbody className="w-full">
              {GetPaginatedData(currentPage, PAGINATION, filteredorders).map(
                (order, index) => {
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
                          // setorder(order);
                          // setContent("create order");
                        }}
                      >
                        <td className="px-[24px] py-[16px]">
                          <p>{order.dateCreated}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <p>{order.orderId}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <p>{order.timeOfOrder}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <p>{order.customer}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <p>{order.order}</p>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <div
                            className={`flexmm px-[10px] py-[5px] rounded-full ${
                              order.status === "completed" && "bg-[#EFFFEB]"
                            } ${order.status === "pending" && "bg-[#FFFDE7]"}`}
                          >
                            <p
                              className={`${
                                order.status === "completed" && "text-[#22A900]"
                              } ${
                                order.status === "pending" && "text-[#FEE718]"
                              }`}
                            >
                              {order.status}
                            </p>
                          </div>
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <div
                            className={`flexmm px-[10px] py-[5px] rounded-full ${
                              order.deliveryStatus === "Delivered" &&
                              "bg-[#EFFFEB]"
                            } ${order.deliveryStatus === "Pending" && "bg-[#FFFDE7]"}`}
                          >
                            <p
                              className={`${
                                order.deliveryStatus === "Delivered" && "text-[#22A900]"
                              } ${
                                order.deliveryStatus === "Pending" && "text-[#FEE718]"
                              }`}
                            >
                              {order.deliveryStatus}
                            </p>
                          </div>
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
      {orders.length === 0 && (
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
