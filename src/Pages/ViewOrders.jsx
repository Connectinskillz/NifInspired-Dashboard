import React, { useState } from "react";
import CoursesTable from "../Components/CoursesTable";

const ViewOrders = () => {
  const [orders, setOrders] = useState([
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Gucci Bag",
      status: "pending",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Pending",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "pending",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
    {
      dateCreated: "13/11/2022",
      orderId: "#2349355",
      timeOfOrder: "09:30am",
      customer: "Toyosi Ibiyemi",
      order: "Nike Shoe",
      status: "completed",
      deliveryStatus: "Delivered",
    },
  ]);

  return (
    <>
      <div className="px-[20px] w-full">
        <div className="mt-4">
          <CoursesTable orders={orders} setOrders={setOrders} />
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
