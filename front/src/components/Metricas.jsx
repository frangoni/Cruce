import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { fetchMetricas, fetchUserMetricas } from "../redux/actions/metricas";
import { Line } from "react-chartjs-2";
import Cadeterias from "./cadeterias";

export default function Metricas({ match }) {
  const dispatch = useDispatch();
  const { metricas, orders, userMetricas } = useSelector((state) => state.metricas);
  const [ejeY, setEjeY] = useState("delay");
  const [text, setText] = useState("Duración desde asignación a entrega");
  const user = useSelector((state) => state.user.user);

  const indices = [
    //agregar objeto donde value sea igual al virtual del modelo Order
    {
      value: "delay",
      label: "Duración desde asignación a entrega",
    },
    {
      value: "delayTransport",
      label: "Duración desde recogida a entrega",
    },
    {
      value: "delayCircuit",
      label: "Duración total",
    },
  ];

  const handleChange = ({ target }) => {
    const { value } = target;
    setEjeY(value);
    indices.map((indice) => {
      if (indice.value == value) setText(indice.label);
    });
  };

  const axis = (arr) => {
    const y = [];
    const x = [];
    for (let i = 0; i < arr.length; i++) {
      y.push(orders[i][ejeY] / 60000); //para pasar a minutos(viene en milisegundos)
      x.push(orders[i].orderId);
    }
    return { x, y };
  };

  const state = {
    labels: axis(orders).x,
    datasets: [
      {
        label: "Minutos",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: axis(orders).y,
      },
    ],
  };
  useEffect(() => {
    dispatch(fetchMetricas());
    dispatch(fetchUserMetricas(match.params.id));
  }, [match.params.id]);

  return (
    <>
      {userMetricas.id != user.id && user.role != "Admin" ? (
        <h3>No tenes permiso para ver esta información!</h3>
      ) : (
        <div style={{ margin: "1em 3em" }}>
          <div>
            {user.role == "Admin" ? (
              <>
                <Typography variant="h3">{userMetricas.name}</Typography>
                {userMetricas.role == "Cadete" ? <p> {userMetricas.cadeteria[0].name} </p> : null}
                <Typography variant="h6">Estas son sus métricas de rendimiento:</Typography>
              </>
            ) : (
              <>
                <Typography variant="h3">Bienvenid@ {user.name}!</Typography>
                <Typography variant="h6">Estas son tus métricas de rendimiento:</Typography>
              </>
            )}
          </div>
          <div id="metricsContainer">
            <Card className="metriCards">
              <CardContent>
                <Typography variant="h1" color="textPrimary">
                  {metricas.pedidosDespachados}
                </Typography>
                <Typography color="textPrimary">Número de pedidos despachados</Typography>
              </CardContent>
            </Card>
            <Card className="metriCards">
              <CardContent>
                <Typography variant="h1" color="textPrimary">
                  {(metricas.demoraPromedioDeEnvio / 60000).toFixed(2)}
                  <Typography variant="caption">minutos</Typography>
                </Typography>
                <Typography color="textPrimary">Demora promedio de envío</Typography>
              </CardContent>
            </Card>

            <Card className="metriCards">
              <CardContent>
                <Typography variant="h1" color="textPrimary">
                  {metricas.pedidosDevueltos}
                </Typography>
                <Typography color="textPrimary">Número de pedidos devueltos</Typography>
              </CardContent>
            </Card>
            <Card className="metriCards">
              <CardContent>
                <Typography variant="h1" color="textPrimary">
                  {(metricas.demoraIngresoDespacho / 60000).toFixed(2)}
                  <Typography variant="caption">minutos</Typography>
                </Typography>
                <Typography color="textPrimary">Demora promedio de ingreso/despacho</Typography>
              </CardContent>
            </Card>
          </div>
          <div id="graphContainer">
            <Line
              id="chart"
              data={state}
              options={{
                title: {
                  display: true,
                  text,
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
            <span>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup aria-label="metricas" name="metricas" value={ejeY} onChange={handleChange}>
                  {indices.map((indice, id) => {
                    return (
                      <FormControlLabel
                        key={id}
                        id={id}
                        value={indice.value}
                        control={<Radio />}
                        label={indice.label}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </span>
          </div>
          {user.role == "Empresa" ? (
            <div>
              <Typography variant="h6">Con estas cadeterias trabajas actualmente:</Typography>
              <Cadeterias />
            </div>
          ) : null}
          {user.role == "Cadete" && user.cadeteria[0] ? (
            <div>
              <Typography variant="h5">Cadeteria en la cual trabajas actualmente: {user.cadeteria[0].name}</Typography>
              <Typography variant="h6"> </Typography>
            </div>
          ) : null}
          {user.role == "Admin" && userMetricas.role == "Empresa" ? (
            <div>
              <Typography variant="h5">Cadeterias con las que trabaja esta empresa:</Typography>
              <ul>
                {userMetricas.cadeteria &&
                  userMetricas.cadeteria.map((cadeteria) => {
                    return (
                      <li id={cadeteria.id}>
                        <h4> {cadeteria.name}</h4>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
