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
  const [order, setOrder] = useState({});
  const stateOrder = useSelector((state) => state.orders.order);
  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
    setOrder(stateOrder);
    const socket = io.connect(window.location.origin, { forceNew: true });
    socket.on("stateUpdate", (data) => {
      if (order.orderId == JSON.parse(data).orderId) {
        setOrder((order) => {
          return { ...order, state: JSON.parse(data).state };
        });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
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
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products &&
            order.products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.sku}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
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
  );
}
