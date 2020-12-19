import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMyOrder, fetchMyOrders, updateMyOrder } from "../redux/actions/orders";
import Button from "@material-ui/core/Button";
import OrdersTable from "./OrderTable";
import Filter from "./Filter";
import { fetchMyTiendas } from "../redux/actions/cadeterias";
import io from "socket.io-client";

const filterTemplate = {
  fecha: { de: 0, hasta: Date.now() },
  estado: ["Retirado", "Pendiente de retiro en sucursal", "Entregado", "Cancelado"],
  tienda: {},
};

const MyOrders = () => {
  const MAX_ORDERS_PER_PAGE = 10;
  const results = useSelector((state) => state.orders.myOrders);
  const { tiendas } = useSelector((state) => state.cadeterias);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(filterTemplate);

  useEffect(() => {
    dispatch(fetchMyTiendas());
    dispatch(fetchMyOrders(page, filter));
    const id = user.id;
    const socket = io.connect(`${window.location.origin}`, { query: { id } });
    socket.on("dbModifications", (data) => {
      const order = JSON.parse(data);
      dispatch(updateMyOrder(order));
      if (order.state == "Pendiente de retiro en sucursal") {
        dispatch(addMyOrder(order));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMyOrders(page, filter));
    return () => {};
  }, [page, filter]);

  const handlerPage = (action) => {
    switch (action) {
      case "sub":
        if (page) setPage((page) => page - 1);
        break;
      case "add":
        if (page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1) setPage((page) => page + 1);
        break;
    }
  };
  return (
    <>
      <Filter setFilter={setFilter} tiendas={tiendas} />
      {user.role == "Admin" ? <h2>Ordenes</h2> : <h2>Mis ordenes</h2>}
      {results.results && results.results.length > 0 ? (
        <>
          <OrdersTable orders={results.results} />
          <Button disabled={!page} onClick={() => handlerPage("sub")}>
            Anterior
          </Button>
          {page + 1}
          <Button
            disabled={!(page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1)}
            onClick={() => handlerPage("add")}
          >
            Siguiente
          </Button>
        </>
      ) : (
        <OrdersTable orders={[]} />
      )}
    </>
  );
};

export default MyOrders;
