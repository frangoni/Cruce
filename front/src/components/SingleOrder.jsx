import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleOrder } from "../redux/actions/orders";
import io from "socket.io-client";


export default function SingleOrder({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const order = useSelector((state) => state.orders.order);

  
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

  return (
    <>
      {
        order.id ?
      <Paper elevation={0} className = 'paper'>
            <p>
            {order.client.name} {order.client.lastName}
            </p> 
            <p>{order.client.email}</p>
           <a href = {`tel:${order.client.phone}`}>{order.client.phone}</a> 
            <p>{order.destination.city}</p>
            <p>{order.destination.street} {order.destination.number}</p>
        
      </Paper> : null
      }
<Paper />
<Paper elevation={3} />

  

    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
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
                <TableCell>{product.sku} | {product.name}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.skuValue}</TableCell>
                <TableCell align="right">{product.totalValue}</TableCell>
              </TableRow>
            ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
            </>
  );
}
