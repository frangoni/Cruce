import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Splash = () => {
  return (
    /*         <div>
            <h1> Bienvenido Cadetear de Cruce </h1>
            <p>No has iniciado sesion, haslo desde <Link to={"/login"}><buton> AQUI</buton></Link></p>
            <p>No tienes una cuenta?, creala desde <Link to={"/register"}><buton> AQUI</buton></Link></p>
        </div> */
    <div className="container">
      <div className="imagenes">
        <img className="logo" src={"./arbol.png"} />
        <img className="logo2" src={"./cruce.png"} />
        <div className="buttons">
          <Button variant="outlined" color="primary">
            <p>Login</p>
          </Button>
          <Button variant="outlined" color="primary">
            <p>Register</p>
          </Button>
        </div>
      </div>
      <div className="barco">
        <div className="barco2">
          <img src={"./barca.png"}></img>
        </div>
      </div>
    </div>
  );
};

export default Splash;
