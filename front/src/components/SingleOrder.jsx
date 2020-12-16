import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  NativeSelect,
  IconButton,
} from "@material-ui/core";
import PhoneForwardedOutlinedIcon from "@material-ui/icons/PhoneForwardedOutlined";
import RoomIcon from "@material-ui/icons/Room";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Confirmacion from "./Confirmacion";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleOrder,
  orderStateUpdate,
  updateSingleOrder,
  fetchPickOrder,
} from "../redux/actions/orders";
import { fetchMyCadeteriaCadete } from "../redux/actions/cadeterias";
import io from "socket.io-client";

export default function SingleOrder({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => state.orders.order);
  const cadeteria = useSelector(
    (state) => state.cadeterias.misCadeteriasCadete
  );
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();

  const handleChange = (event) => {
    const name = event.target.value;
    setName(name);
    setOpen(true);
  };

  const handlerPickUpOrder = (orderId) => {
    dispatch(fetchPickOrder(orderId));
  };

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
  }, [order.state]);

  let estados;

  if (user.role == "Admin") {
    estados = [
      "Pendiente",
      "Pendiente de retiro en sucursal",
      "Retirado",
      "Entregado",
      "Cancelado",
    ];
  } else {
    estados = [
      "Pendiente de retiro en sucursal",
      "Retirado",
      "Entregado",
      "Cancelado",
    ];
  }

  let i = estados.indexOf(order.state);

  const accept = () => {
    setOpen(false);
    dispatch(orderStateUpdate(name, order.orderId, user.id));
  };

  const deny = () => {
    setOpen(false);
    setName(order.state);
  };

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
    if (order.cadeteId) {
      dispatch(fetchMyCadeteriaCadete(order.cadeteId));
    }

    const socket = io.connect(`${window.location.origin}`, {
      query: { id: user.id },
    });
    socket.on("dbModifications", (data) => {
      if (orderId == JSON.parse(data).orderId) {
        dispatch(updateSingleOrder(JSON.parse(data).state));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (order.cadeteId) {
      dispatch(fetchMyCadeteriaCadete(order.cadeteId));
    }
  }, [order.cadeteId]);

  const factura = () => {
    let discounts = 0;
    let skuTotal = 0;
    let shipping = 0;
    order.products.length > 0
      ? order.products.map((product) => {
          discounts += Number(product.discountsTotals);
          skuTotal += Number(product.skuValue);
          shipping += Number(product.shippingValue);
        })
      : null;
    return { discounts, skuTotal, shipping };
  };

  return (
    <>
      {order.id ? (
        <div>
          <Confirmacion
            open={open}
            accept={accept}
            title={"Alerta!"}
            deny={deny}
          />
          <Paper elevation={5} className="singleOrderContainer">
            <div className="singleOrderHeader">
              <div className="divTiendaSingleOrder">
                <p>{order.empresa.name}</p>
                <p>Pedido: {order.orderId}</p>
                <p>{order.empresa.email}</p>
              </div>
              {user.role == "Cadete" && order.state == "Pendiente" ? (
                <div className="pcikUpSingleOrder">
                  <Button
                    variant="outlined"
                    color="Primary"
                    size="small"
                    startIcon={<CheckIcon />}
                    onClick={() => handlerPickUpOrder(order.id)}
                  >
                    Tomar Orden
                  </Button>
                  <div className="divider" />
                  <Button
                    variant="outlined"
                    color="light-grey"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push("/ordenes")}
                  >
                    Volver
                  </Button>
                </div>
              ) : (
                <div className="pcikUpSingleOrder">
                  <Button
                    variant="outlined"
                    color="light-grey"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push("/ordenes")}
                  >
                    Volver
                  </Button>
                </div>
              )}
            </div>
            <div className="singleOrderPapers">
              <Paper elevation={3} className="paper">
                <h4>Cliente:</h4>
                <p>
                  {order.client.name} {order.client.lastName}
                </p>
                <p>{order.client.email}</p>
                <span className="links">
                  <p> {order.client.phone}</p>
                  <IconButton href={`tel:${order.client.phone}`}>
                    <PhoneForwardedOutlinedIcon fontSize="large" />
                  </IconButton>
                </span>
                <p> {order.destination.city}</p>
                <span className="links">
                  <p>
                    {order.destination.street} {order.destination.number}
                  </p>
                  <IconButton
                    href={`https://www.google.com/maps/place/${order.destination.street}%20${order.destination.number}%20${order.destination.city}`}
                  >
                    <RoomIcon fontSize="large" />
                  </IconButton>
                </span>
              </Paper>
              <Paper elevation={3} className="paper">
                <h4>Pedido:</h4>
                <p>Fecha: {order.creationDate}</p>

                {user.id === order.cadeteId || user.role == "Admin" ? (
                  <FormControl>
                    <NativeSelect value="" onChange={handleChange}>
                      <option value={estados[i]}>{estados[i]}</option>
                      {estados[i] == "Entregado" ||
                      estados[i] == "Cancelado" ? null : (
                        <>
                          <option value={estados[i + 1]}>
                            {estados[i + 1]}
                          </option>
                          <option value="Cancelado">Cancelado</option>
                        </>
                      )}
                    </NativeSelect>
                  </FormControl>
                ) : (
                  <p>Estado: {order.state}</p>
                )}
                <p>Id: {order.orderId}</p>
                {order.cadete ? (
                  <>
                    <p>Cadete: {order.cadete.name}</p>
                    {cadeteria.length > 0 ? (
                      <p>Cadeteria: {cadeteria[0].name}</p>
                    ) : null}
                  </>
                ) : null}
              </Paper>

              <Paper elevation={3} className="paper">
                <h4>Facturación:</h4>
                <p>Subtotal: ${factura().skuTotal}</p>
                <p>Descuento: ${factura().discounts}</p>
                <p>Costo de envio: ${factura().shipping}</p>
                <p>
                  Total: $
                  {(
                    factura().skuTotal +
                    factura().discounts +
                    factura().shipping
                  ).toFixed(2)}
                </p>
              </Paper>
            </div>
            <TableContainer component={Paper} className="singleOrderContainer">
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Descripción</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio Unitario</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products &&
                    order.products.map((product) => (
                      <TableRow key={product.sku}>
                        <TableCell>
                          SKU {product.sku} | {product.name}
                        </TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        <TableCell align="right">{product.skuValue}</TableCell>
                        <TableCell align="right">
                          {product.totalValue}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : null}
    </>
  );
}
