const Order = require("../Models/Order");

const getMetricas = async (req, res, next) => {
  const userId = req.user.id;
  const role = req.user.role;
  try {
    const metricas = {
      pedidosDespachados: 0,
      pedidosDevueltos: 0,
      demoraPromedioDeEnvio: 0,
      demoraIngresoDespacho: 0,
    };

    const orders = await Order.findAll({
      where:
        role == "Empresa"
          ? {
              empresaId: userId,
              state: ["Entregado", "Cancelado"],
            }
          : {
              cadeteId: userId,
              state: ["Entregado", "Cancelado"],
            },
    });

    let q = 0;
    orders.map((order) => {
      if (order.state === "Entregado") {
        q++;
        metricas.pedidosDespachados += 1;
        metricas.demoraIngresoDespacho += order.deliveredDate - order.createdAt;
        metricas.demoraPromedioDeEnvio += order.deliveredDate - order.assignedDate;
      }
      if (order.state === "Cancelado") {
        metricas.pedidosDevueltos += 1;
      }
    });
    metricas.demoraIngresoDespacho = metricas.demoraIngresoDespacho / q;
    metricas.demoraPromedioDeEnvio = metricas.demoraPromedioDeEnvio / q;

    res.status(200).send({ metricas, orders });
  } catch (e) {
    res.status(503).end();
  }
};

module.exports = getMetricas;
