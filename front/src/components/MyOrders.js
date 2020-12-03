import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchMyOrders } from "../redux/actions/orders"
import Button from "@material-ui/core/Button";
import OrdersTable from './OrderTable'

const MyOrders = () => {
    const MAX_ORDERS_PER_PAGE = 10
    const results = useSelector(state => state.orders.myOrders)
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)

    useEffect(() => {
        dispatch(fetchMyOrders(page))
        return () => { }
    }, [page])

    const handler = () => {
        console.log("deja de hacer click en cualquier lado")
    }
    const handlerPage = action => {

        console.log(Math.ceil(results.count / MAX_ORDERS_PER_PAGE))
        console.log("count", results.count)
        switch (action) {
            case "sub":
                if (page) setPage(page => page - 1)
                break;
            case "add": if (page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1) setPage(page => page + 1)
                break;
        }

    }

    return (
        <div>
            <p>Mis ordenes</p>
            {results.results ? < OrdersTable orders={results.results} handler={handler} /> : null}
            <Button disabled={!page} onClick={() => handlerPage("sub")} >Anterior</Button> {page + 1} <Button disabled={!(page < Math.ceil(results.count / MAX_ORDERS_PER_PAGE) - 1)} onClick={() => handlerPage("add")}>Siguiente</Button>

        </div>
    )
}

export default MyOrders;