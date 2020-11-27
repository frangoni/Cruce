import React from 'react'
import { Link } from "react-router-dom";
const Splash = () => {

    return (
        <div>
            <h1> Bienvenido Cadetear de Cruce </h1>
            <p>No has iniciado sesion, haslo desde <Link to={"/login"}><button> AQUI</button></Link></p>
            <p>No tienes una cuenta?, creala desde <Link to={"/register"}><button> AQUI</button></Link></p>
        </div>
    )
}

export default Splash;