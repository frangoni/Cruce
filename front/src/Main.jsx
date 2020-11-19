import React from 'react'
import Register from './components/Register'
import { Route } from "react-router-dom";
import AdminPanel from './components/admin/panel'

export default function Main() {
    return (
        <>
            <Route path='/register' component={Register} />
            <Route path='/admin' component={AdminPanel} />
        </>
    )
}


