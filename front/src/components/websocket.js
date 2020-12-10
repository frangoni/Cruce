import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, addOrders, filterOrders, fetchPickOrder, updateOrder } from "../redux/actions/orders"
import SheetUpload from "./SheetUpload";

const WebSocket = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)
  const { role, id } = useSelector(state => state.user.user)

  const handler = (orderId) => {
    dispatch(fetchPickOrder(orderId));
  };

  useEffect(() => {
    dispatch(fetchOrders())
    const socket = io.connect(`${window.location.origin}`, { query: { id } });

    socket.on('ordersCreated', (data) => {
      const orders = JSON.parse(data)
      console.log("orders del bulkcreate", orders)
      if (role === "Cadete" || (orders.empresa === id)) dispatch(addOrders(orders.ordenes))
    });

    socket.on('dbModifications', (data) => {
      const order = JSON.parse(data)
      if (role === "Cadete") dispatch(filterOrders(order.orderId))
      else if (role === "Empresa") dispatch(updateOrder(order))
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
