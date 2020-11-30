import React, { useEffect, useState, useRef } from "react"
import { DataGrid } from "@material-ui/data-grid";
import OrdersTable from "./OrderTable"
import io from 'socket.io-client'
import { useSelector } from "react-redux"
import axios from "axios"


const WebSocket = () => {
    const [orders, setOrders] = useState([])
    const userId = useSelector(state => state.user.user.id)

    const handler = (orderId) => {
        axios.put("/api/order", { userId, orderId }).then(res => console.log(res))
    }

    useEffect(() => {
        axios.get('/api/order').then(data => setOrders(data.data))
        const socket = io.connect('http://localhost:8000', { 'forceNew': true });
        socket.on('ordersCreated', (data) => {
            setOrders(orders => [...orders, ...JSON.parse(data)])
        });

        socket.on('dbModifications', (data) => {
            console.log("dentro de dbModifications")

            const orderId = JSON.parse(data).orderId
            console.log(orderId)
            setOrders(orders => orders.filter(order => order.id !== orderId))
        });

        return () => {
            socket.disconnect()
        }
    }, [])

    console.log(orders);


    return (
        <div>
            <p> conectado con el server</p>
            {orders.length ? (
                <div style={{ height: 800, width: "100%" }}>
                    <OrdersTable orders={orders} handler={handler} />
                </div>
            ) : null}
        </div>
    )
}

export default WebSocket