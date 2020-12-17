import React, { useEffect, useLayoutEffect, useState } from "react";
import OrdersTable from "./OrderTable";
import io from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  addOrders,
  filterOrders,
  fetchPickOrder,
  updateOrder,
  deleteMessage,
} from "../redux/actions/orders";
import SheetUpload from "./SheetUpload";
import { Paper } from "@material-ui/core";

const WebSocket = () => {
  const dispatch = useDispatch();
  const { orders, message } = useSelector((state) => state.orders);
  const { role, id } = useSelector((state) => state.user.user);
  const [display, setDisplay] = useState("none");

  const handler = (orderId) => {
    dispatch(fetchPickOrder(orderId));
  };

  useEffect(() => {
    dispatch(fetchOrders());
    const socket = io.connect(`${window.location.origin}`, { query: { id } });

    socket.on("ordersCreated", (data) => {
      const orders = JSON.parse(data);
      if (role === "Cadete" || orders.empresa === id) dispatch(addOrders(orders.ordenes));
    });

    socket.on("dbModifications", (data) => {
      const order = JSON.parse(data);
      if (role === "Cadete") dispatch(filterOrders(order.orderId));
      else if (role === "Empresa") dispatch(updateOrder(order));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (message) {
      setDisplay("flex");
      setTimeout(() => {
        setDisplay("none");
        dispatch(deleteMessage());
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <Paper elevation={15} style={{ display }} id="alertaPickUp">
        <h3>{message}</h3>
      </Paper>
      {orders.length ? (
        <div style={{ height: 800, width: "100%" }}>
          <OrdersTable orders={orders} handler={handler} />
        </div>
      ) : (
        <OrdersTable orders={[]} />
      )}
      {role === "Empresa" ? <SheetUpload /> : null}
    </>
  );
};

export default WebSocket;
