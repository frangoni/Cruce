import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  addOrders,
  filterOrders,
  fetchPickOrder,
  updateOrder,
} from "../redux/actions/orders";
import SheetUpload from "./SheetUpload";
import { userLogout } from "../redux/actions/user";
import { useHistory } from "react-router-dom";
const WebSocket = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orders } = useSelector((state) => state.orders);
  const { role, id } = useSelector((state) => state.user.user);

  const setLogout = () => {
    dispatch(userLogout());
    history.push("/splash");
  };
  const handler = (orderId) => {
    dispatch(fetchPickOrder(orderId));
  };

  useEffect(() => {
    dispatch(fetchOrders());
    const socket = io.connect(`${window.location.origin}`, { query: { id } });

    socket.on("ordersCreated", (data) => {
      const orders = JSON.parse(data);
      console.log("orders del bulkcreate", orders);
      if (role === "Cadete" || orders.empresa === id)
        dispatch(addOrders(orders.ordenes));
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

  return (
    <>
      <Button variant="contained" color="primary" onClick={setLogout}>
        Logout
      </Button>
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
