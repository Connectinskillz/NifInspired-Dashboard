import React, { useState, useEffect } from "react";
import OrdersTable from "../Components/OrdersTable";
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
        <OrdersTable orders={orders} setOrders={setOrders} />
      </div>
    </>
  );
};

export default ViewOrders;
