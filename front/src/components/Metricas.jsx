import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fetchMetricas } from "../redux/actions/metricas";
import { Line } from "react-chartjs-2";

export default function SpacingGrid() {
  const dispatch = useDispatch();
  const { metricas, orders } = useSelector((state) => state.metricas);
  const [ejeY, setEjeY] = useState("delay");
  const [text, setText] = useState("Promedio de entrega en minutos");

  const axis = (arr) => {
    const y = [];
    const x = [];
    for (let i = 0; i < arr.length; i++) {
      y.push(orders[i][ejeY] / 60000);
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
  }, []);

  return (
    <>
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
      <div>
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
      </div>
    </>
  );
}
