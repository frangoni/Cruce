import React, { useState } from "react";
import { IconButton, Switch, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";

const Filter = ({ setFilter, tiendas }) => {
  const [fromDate, setFromDate] = useState(Date.now());
  const [toDate, setToDate] = useState(Date.now());
  const [active, setActive] = useState("filterHidden");
  const [icon, setIcon] = useState(<ArrowBackIosOutlinedIcon />);
  const [opened, setOpened] = useState(false);
  const { role } = useSelector((state) => state.user.user);
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
    e.setHours(23, 59, 59);
    setFilter((filter) => ({
      ...filter,
      fecha: { ...filter.fecha, hasta: e.getTime() },
    }));
    setToDate(e);
  };
  const handleTienda = (value) => {
    if (!value)
      setFilter((filter) => ({
        ...filter,
        tienda: {},
      }));
    else
      setFilter((filter) => ({
        ...filter,
        tienda: value,
      }));
  };
  const handleWidth = () => {
    if (opened) {
      setActive("filterHidden");
      setIcon(<ArrowBackIosOutlinedIcon />);
    } else {
      setActive("filterActive");
      setIcon(<ArrowForwardIosOutlinedIcon />);
    }
    setOpened(!opened);
  };

  return (
    <>
      <div className={active}>
        <IconButton id="filterButton" onClick={handleWidth}>
          {icon}
        </IconButton>
        {role != "Empresa" ? (
          <>
            <h3>
              <b>TIENDAS</b>
            </h3>
            <Autocomplete
              id="tiendas"
              options={tiendas}
              onChange={(a, value) => handleTienda(value)}
              getOptionLabel={(tienda) => tienda.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Tiendas" variant="outlined" />}
            />
          </>
        ) : null}

        <h3 style={{ marginTop: "10px" }}>
          <b>ESTADO</b>
        </h3>
        {role == "Admin" ? (
          <>
            <p>Pendiente:</p>
            <Switch name="Pendiente" onChange={(e) => handleFilter(e)} />
          </>
        ) : null}
        <p> Entregado:</p>
        <Switch defaultChecked name="Entregado" onChange={(e) => handleFilter(e)} />
        <p> Retirado:</p>
        <Switch defaultChecked name="Retirado" onChange={(e) => handleFilter(e)} />
        <p> Pendiente de retiro en sucursal:</p>
        <Switch defaultChecked name="Pendiente de retiro en sucursal" onChange={(e) => handleFilter(e)} />
        <p> Cancelado:</p>
        <Switch defaultChecked name="Cancelado" onChange={(e) => handleFilter(e)} />
        <h3>
          <b>FECHA</b>
        </h3>
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
    </>
  );
};

export default Filter;
