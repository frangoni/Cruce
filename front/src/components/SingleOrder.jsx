import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleOrder,
  orderStateUpdate,
  updateSingleOrder,
} from "../redux/actions/orders";
import io from "socket.io-client";

export default function SingleOrder({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));

    const socket = io.connect(window.location.origin, { forceNew: true });
    socket.on("dbModifications", (data) => {
      if (orderId == JSON.parse(data).orderId) {
        dispatch(updateSingleOrder(JSON.parse(data).state));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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

  const handleChange = (event) => {
    const name = event.target.value;
    dispatch(orderStateUpdate(name, order.orderId));
  };

  const estados = [
    "Pendiente de retiro en sucursal",
    "Retirado",
    "Entregado",
    "Cancelado",
  ];
  let i = estados.indexOf(order.state);

  return (
    <>
      {order.id ? (
        <Paper elevation={5} className="singleOrderContainer">
          <p>{order.empresa.name}</p>
          <p>Pedido: {order.orderId}</p>
          <p>{order.empresa.email}</p>
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

              {user.id === order.cadeteId ? (
                <FormControl>
                  <NativeSelect value="" onChange={handleChange}>
                    <option value={estados[i]}>{estados[i]}</option>
                    {estados[i] == "Entregado" ||
                    estados[i] == "Cancelado" ? null : (
                      <>
                        <option value={estados[i + 1]}>{estados[i + 1]}</option>
                        <option value="Cancelado">Cancelado</option>
                      </>
                    )}
                  </NativeSelect>
                </FormControl>
              ) : (
                <p>Estado: {order.state}</p>
              )}

              <p>Id: {order.orderId}</p>
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
                      <TableCell align="right">{product.totalValue}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </>
  );
}
