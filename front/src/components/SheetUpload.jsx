import React, { useRef } from "react";
import { useState } from "react";
import XLSX from "xlsx";
import { postOrders } from "../redux/actions/orders";
import { DataGrid } from "@material-ui/data-grid";
export default () => {
  const fileInputRef = useRef();
  const [orders, setOrders] = useState([]);
  const joinOrders = (arr) => {
    let orders = [];
    arr.map((item) => {
      const index = orders.findIndex((order) => order.orderId === item.orderId);
      if (index > -1) {
        orders[index].products.push(...item.products);
      } else {
        orders.push(item);
      }
    });
    return orders.map((order) => ({
      ...order,
      products: JSON.stringify(order.products),
    }));
  };
  const handleInputChange = (e) => {
    let ordenes = [];
    const target = e.target;
    const fileExt = e.target.value.slice(e.target.value.lastIndexOf("."));
    if (fileExt == ".xls") {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        let data = new Uint8Array(e.target.result);
        let workBook = XLSX.read(data, { type: "array" });
        let planilla = XLSX.utils.sheet_to_json(
          workBook.Sheets[workBook.SheetNames],
          { range: 1 }
        );
        planilla.map((order) =>
          ordenes.push({
            from: order.Origin,
            orderId: order.Order,
            creationDate: order["Creation Date"],
            client: JSON.stringify({
              name: order["Client Name"],
              lastName: order["Client Last Name"],
              email: order["Email"],
              phone: order["Phone"],
            }),
            destination: JSON.stringify({
              uf: order.UF,
              city: order.City,
              receiverName: order["Receiver Name"],
              street: order.Street,
              number: order.Number,
              complement: order.Complement ? order.Complement : "",
              neighbordhood: order.Neighbordhood ? order.Neighbordhood : "",
              reference: order.Reference ? order.Reference : "",
              postalCode: order["Postal Code"],
              estimatedDelivery: order["Estimate Delivery Date"],
              courier: order.Courrier,
            }),
            products: [
              {
                sku: order.ID_SKU,
                quantity: order.Quantity_SKU,
                name: order["SKU NAME"],
                skuValue: order["SKU VALUE"],
                discountsTotals: order["Discounts Totals"],
                shippingValue: order["Shipping Value"],
                totalValue: order["Total Value"],
              },
            ],
          })
        );
        setOrders(joinOrders(ordenes));
      };
    } else {
      alert(`${fileExt} extension not supported. Please use "xlsx"`);
    }
    console.log("orders", orders);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postOrders(orders);
    fileInputRef.current.value = "";
    setOrders([]);
  };
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
  return (
    <div>
      <input
        required
        type="file"
        name="file"
        ref={fileInputRef}
        id="file"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Crear Ordenes</button>
      {orders.length ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={orders.map((order, i) => ({
              ...order,
              id: i,
              client: JSON.parse(order.client).name,
              products: JSON.parse(order.products).length,
            }))}
            columns={columns}
            pageSize={5}
          />
        </div>
      ) : null}
    </div>
  );
};
