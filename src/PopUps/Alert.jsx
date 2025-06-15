import { useState } from "react";
import { updateOrderStatus } from "../Services/request";
import Loader from "../Components/Loader/Loader";

const Alert = ({ status, setIsOpenModal, order }) => {
  const [updated, setUpdated] = useState(false);
  const handleStatusChange = async () => {
    setUpdated(true);
    let token = localStorage.getItem("nifInspiredToken");
    let body = { order_id: order.order_id, status };
    let data = await updateOrderStatus(token, body);
    setUpdated(false);
    if (data) {
      if (status === "completed") {
        order.status = "completed";
      } else if (status === "pending") {
        order.status = "pending";
      } else if (status === "cancel") {
        order.status = "cancelled";
      }
    }

    setIsOpenModal(false);
  };
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/35 flexmm"
        onClick={() => {
          console.log(status);
          setIsOpenModal(false);
        }}
      >
        <div
          className="w-[300px] cflexss gap-[100px] p-[20px] bg-white  text-black rounded-[12px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {status === "completed" && (
            <p>
              Are you sure you want to switch this product status to{" "}
              <strong>Completed</strong>
            </p>
          )}
          {status === "pending" && (
            <p>
              Are you sure you want to switch this product status to{" "}
              <strong>Pending</strong>
            </p>
          )}
          {status === "cancel" && (
            <p>Are you sure you want to cancel this product Order?</p>
          )}
          <div className="w-full flexmm gap-[50px] text-[18px] text-white">
            <button
              className="rounded-full px-[30px] font-[500]  py-[10px] flexmm outline-none bg-accent"
              onClick={handleStatusChange}
            >
              {updated ? <Loader /> : <p>Yes</p>}
            </button>
            <button
              className="rounded-full px-[30px] font-[500] py-[10px] flexmm outline-none bg-[#BB0000]"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              <p>No</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
