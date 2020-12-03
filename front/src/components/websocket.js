import React, { useEffect, useState, useRef } from "react";
import OrdersTable from "./OrderTable";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import SheetUpload from "./SheetUpload";

const WebSocket = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.user.user.id);
  const handler = (orderId) => {
    axios
      .put("/api/order", { userId, orderId })
      .then((res) => console.log(res));
  };

  useEffect(() => {
    axios.get("/api/order").then((data) => setOrders(data.data));
    const socket = io.connect(window.location.origin, { forceNew: true });
    socket.on("ordersCreated", (data) => {
      setOrders((orders) => [...orders, ...JSON.parse(data)]);
    });
    socket.on("dbModifications", (data) => {
      const orderId = JSON.parse(data).orderId;
      setOrders((orders) => orders.filter((order) => order.id !== orderId));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <SheetUpload />
      {orders.length ? (
        <div style={{ height: 800, width: "100%" }}>
          <OrdersTable orders={orders} handler={handler} />
        </div>
      ) : null}
    </>
  );
};

export default WebSocket;
