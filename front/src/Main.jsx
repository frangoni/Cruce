import React from 'react'
import Register from './components/Register'
import { Route } from "react-router-dom";

export default function Main() {
    return (
        <>
            <Route path='/register' component={Register}/>
        </>
    )
}


