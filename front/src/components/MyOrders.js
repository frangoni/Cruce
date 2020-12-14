import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../redux/actions/orders";
import Button from "@material-ui/core/Button";
import OrdersTable from "./OrderTable";
import { Link } from "react-router-dom";

const filterTemplate = {
    fecha: { de: 0, hasta: Date.now() },
    estado: ["Retirado"]
}

const MyOrders = () => {
    const MAX_ORDERS_PER_PAGE = 10;
    const results = useSelector((state) => state.orders.myOrders);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);

    const [filter, setFilter] = useState(filterTemplate)

    useEffect(() => {
        dispatch(fetchMyOrders(page, filter));
        return () => { };
    }, [page]);

    const handler = () => {
        console.log("deja de hacer click en cualquier lado");
    };
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
    return (
        <>
            {results.results && results.results.length > 0 ? (
                <>
                    <p>Mis ordenes</p>
                    <OrdersTable orders={results.results} handler={handler} />
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
