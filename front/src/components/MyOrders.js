import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../redux/actions/orders";
import { Button, Switch } from "@material-ui/core";
import OrdersTable from "./OrderTable";
import { Link } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const filterTemplate = {
  fecha: { de: 0, hasta: Date.now() },
  estado: [
    "Retirado",
    "Pendiente de retiro en sucursal",
    "Entregado",
    "Cancelado",
  ],
};

const MyOrders = () => {
  const MAX_ORDERS_PER_PAGE = 10;
  const results = useSelector((state) => state.orders.myOrders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(filterTemplate);
  const [fromDate, setFromDate] = useState(Date.now());
  const [toDate, setToDate] = useState(Date.now());

  useEffect(() => {
    dispatch(fetchMyOrders(page, filter));
    return () => {};
  }, [page]);

  const handlerPage = (action) => {
    switch (action) {
      case "sub":
        if (page) setPage((page) => page - 1);
        break;
      case "add":
        if (page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1)
          setPage((page) => page + 1);
        break;
    }
  };

  const handleFilter = (e) => {
    if (e.currentTarget.checked) {
      setFilter((filter) => ({
        ...filter,
        estado: [...filter.estado, e.target.name],
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        estado: filter.estado.filter((estado) => estado != e.target.name),
      }));
    }
  };
  const handleDateDesde = (e) => {
    e.setHours(0, 0, 0);
    setFilter((filter) => ({
      ...filter,
      fecha: { ...filter.fecha, de: e.getTime() },
    }));
    setFromDate(e);
  };
  const handleDateHasta = (e) => {
    setFilter((filter) => ({
      ...filter,
      fecha: { ...filter.fecha, hasta: e.getTime() },
    }));
    setToDate(e);
  };
  useEffect(() => {
    dispatch(fetchMyOrders(page, filter));
  }, [filter]);

  return (
    <>
      <div id="filter">
        <p>Estado:</p>
        Entregado:
        <Switch
          defaultChecked
          name="Entregado"
          onChange={(e) => handleFilter(e)}
        />
        Retirado
        <Switch
          defaultChecked
          name="Retirado"
          onChange={(e) => handleFilter(e)}
        />
        Pendiente de retiro en sucursal
        <Switch
          defaultChecked
          name="Pendiente de retiro en sucursal"
          onChange={(e) => handleFilter(e)}
        />
        Cancelado
        <Switch
          defaultChecked
          name="Cancelado"
          onChange={(e) => handleFilter(e)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableFuture={true}
            strictCompareDates={true}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Desde"
            onChange={handleDateDesde}
            value={fromDate}
          />
          <KeyboardDatePicker
            disableToolbar
            disableFuture={true}
            strictCompareDates={true}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Hasta"
            onChange={handleDateHasta}
            value={toDate}
          />
        </MuiPickersUtilsProvider>
      </div>
      {results.results && results.results.length > 0 ? (
        <>
          <p>Mis ordenes</p>

          <OrdersTable orders={results.results} />
          <Button disabled={!page} onClick={() => handlerPage("sub")}>
            Anterior
          </Button>
          {page + 1}
          <Button
            disabled={
              !(page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1)
            }
            onClick={() => handlerPage("add")}
          >
            Siguiente
          </Button>
        </>
      ) : (
        <>
          <p>Sin ordenes activas!</p>
          <Link to="/ordenes">
            <Button>Asignar nuevas</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default MyOrders;
