import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  addOrders,
  filterOrders,
  fetchPickOrder,
} from "../redux/actions/orders";
import SheetUpload from "./SheetUpload";

const WebSocket = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const handler = (orderId) => {
    dispatch(fetchPickOrder(orderId));
  };

  useEffect(() => {
    dispatch(fetchOrders());
    const socket = io.connect(`${window.location.origin}`, { forceNew: true });

    socket.on("ordersCreated", (data) => {
      dispatch(addOrders([...JSON.parse(data)]));
    });

    socket.on("dbModifications", (data) => {
      const orderId = JSON.parse(data).orderId;
      dispatch(filterOrders(orderId));
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
