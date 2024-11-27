import React, { useState, useEffect } from "react";
import CoursesTable from "../Components/CoursesTable";
import { fetchAllOrders } from "../Services/request";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const data = await fetchAllOrders();
    setOrders(data);
    console.log(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

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
