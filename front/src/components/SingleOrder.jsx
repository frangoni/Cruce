import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleOrder, orderStateUpdate } from "../redux/actions/orders";
import io from "socket.io-client";

export default function SingleOrder({ match }) {

  const orderId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));

    const socket = io.connect(window.location.origin, { forceNew: true });
    socket.on("stateUpdate", (data) => {
      if (order.orderId == JSON.parse(data).orderId) {
        order = { ...order, state: JSON.parse(data).state };
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const order = useSelector((state) => state.orders.order);
  const user = useSelector((state) => state.user.user);
  



  const factura = () => {
    let discounts = 0;
    let skuTotal = 0;
    let shipping = 0;
    order.products.length > 0 ? order.products.map((product) => {
      discounts += Number(product.discountsTotals);
      skuTotal += Number(product.skuValue);
      shipping += Number(product.shippingValue);
    }) : null;
    return { discounts, skuTotal, shipping };
  };

  const style = {
    orderDescription: {
      display: "flex",
      justifyContent: "space-evenly",
      margin: "2%",
    },
    paper: {
      width: "25%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingLeft: "2%",
    },
    container: {
      width: "95%",
      margin: "3% auto",
      height: "100%",
      padding: "1%",
    },
    links: {
      textDecoration: "none",
    },
  };

  
 

  const handleChange = (event) => {
    const name = event.target.value;
   
    dispatch(orderStateUpdate(name, order.orderId))
    
  };


  const estados = [
    "Pendiente de retiro en sucursal",
    "Retirado",
    "Entregado",
    "Cancelado"
  ];
  let i = estados.indexOf(order.state);

  return (
    <>
      {order.id ? (
        <Paper elevation={3} style={style.container}>
          <p>Pedido: {order.orderId}</p>
          <p>{order.empresa.company}</p>
          <p>{order.empresa.email}</p>
          <div style={style.orderDescription}>
            <Paper elevation={3} style={style.paper}>
              <h4>Datos del cliente:</h4>
              <p>
                {order.client.name} {order.client.lastName}
              </p>
              <p>{order.client.email}</p>
              <a style={style.links} href={`tel:${order.client.phone}`}>
                {order.client.phone}
              </a>
              <a
                style={style.links}
                href={`https://www.google.com/maps/place/${order.destination.street}%20${order.destination.number}%20${order.destination.city}`}
                target="_blank"
              >
                <p>{order.destination.city}</p>
                <p>
                  {order.destination.street} {order.destination.number}
                </p>
              </a>
            </Paper>
            <Paper elevation={3} style={style.paper}>
              <h4>Datos del pedido:</h4>
              <p>Fecha: {order.creationDate}</p>

              {user.id === order.cadeteId ? (
                <FormControl>
                  <NativeSelect
                    value=''
                    onChange={handleChange}
                  >
                    <option value={estados[i]}>{estados[i]}</option>
                    {
                      estados[i] == 'Entregado' || estados[i] == 'Cancelado' ? null : <><option value={estados[i + 1]}>{estados[i + 1]}</option>
                      <option value='Cancelado'>Cancelado</option></>
                    }
                    
              
                    
                  </NativeSelect>
                </FormControl>
              ) : (
                <p>Estado: {order.state}</p>
              )}

              <p>Id: {order.orderId}</p>
            </Paper>

            <Paper elevation={3} style={style.paper}>
              <h4>Numero de factura: #54534</h4>
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
          <TableContainer component={Paper} style={style.container}>
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
                        {product.sku} | {product.name}
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
