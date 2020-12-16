import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../redux/actions/orders";
import Button from "@material-ui/core/Button";
import OrdersTable from "./OrderTable";
import Filter from "./Filter";
import { fetchMyTiendas } from "../redux/actions/cadeterias";

const filterTemplate = {
  fecha: { de: 0, hasta: Date.now() },
  estado: ["Retirado", "Pendiente de retiro en sucursal", "Entregado", "Cancelado"],
  tienda: {},
};

const MyOrders = () => {
  const MAX_ORDERS_PER_PAGE = 10;
  const results = useSelector((state) => state.orders.myOrders);
  const { tiendas } = useSelector((state) => state.cadeterias);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(filterTemplate);

  useEffect(() => {
    dispatch(fetchMyTiendas());
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
  console.log("FILTER", filter);
  return (
    <>
      <Filter setFilter={setFilter} tiendas={tiendas} />
      <h2>Mis ordenes</h2>
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
