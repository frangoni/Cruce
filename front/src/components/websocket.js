import React, { useEffect, useState, useRef } from "react"
import { DataGrid } from "@material-ui/data-grid";
import io from 'socket.io-client'

const columns = [
    { field: "from", headerName: "Origen", width: 300 },
    { field: "orderId", headerName: "Id", width: 300 },
    { field: "creationDate", headerName: "Fecha de Creacion", width: 300 },
    {
        field: "client",
        headerName: "Cliente",
        width: 300,
    },
    {
        field: "products",
        headerName: "N° de productos",
        width: 300,
    },
];

const WebSocket = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const socket = io.connect('http://localhost:8000', { 'forceNew': true });
        socket.on('dbModifications', (data) => {
            setOrders(orders => [...orders, ...JSON.parse(data)])
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
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        pageSize={25}
                        onRowClick={(row) => console.log(row)}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default WebSocket