import React, { useRef, useState } from "react";
import XLSX from "xlsx";
import { postOrders } from "../redux/actions/orders";
import { DataGrid } from "@material-ui/data-grid";
import { Modal, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector } from "react-redux";
export default () => {
  const user = useSelector((state) => state.user.user);

  const fileInputRef = useRef();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
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
        planilla.map((order) => {
          let date = new Date(order["Creation Date"]);
          ordenes.push({
            from: order.Courrier,
            orderId: order.Order,
            creationDate: date.setHours(date.getHours() + 3),
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
            }),
            products: [
              {

                sku: order.ID_SKU,
                quantity: order.Quantity_SKU,
                name: order["SKU Name"],
                skuValue: order["SKU Value"],
                discountsTotals: order["Discounts Totals"],
                shippingValue: order["Shipping Value"],
                totalValue: order["Total Value"],
              },
            ],
          });
        });
        setOrders(joinOrders(ordenes));
        setOpen(true);
      };
    } else {
      alert(`${fileExt} extension not supported. Please use "xlsx"`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postOrders({ orders, user });
    fileInputRef.current.value = "";
    setOrders([]);
    setOpen(false);
  };
  const handleReject = (e) => {
    e.preventDefault();
    fileInputRef.current.value = "";
    setOrders([]);
    setOpen(false);
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const columns = [
    { field: "from", headerName: "Origen", width: 300 },
    { field: "orderId", headerName: "Id", width: 300 },
    { field: "creationDate", headerName: "Fecha de Creacion", width: 300 },
    { field: "client", headerName: "Cliente", width: 300 },
    { field: "products", headerName: "N° de productos", width: 100 },
  ];
  return (
    <>
      <IconButton id="add" onClick={handleClick} style={{ float: "right", position: "fixed" }}>
        <AddCircleIcon style={{ fontSize: 70, color: "#6f20f0" }} />
      </IconButton>
      <input
        required
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleInputChange}
      />
      <Modal open={open} onClose={handleReject}>
        <>
          <div id="modal">
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
          <div className="modalButton">
            <IconButton onClick={handleSubmit}>
              <AddCircleIcon style={{ fontSize: 50, color: "#6f20f0" }} />
            </IconButton>
            <IconButton onClick={handleReject}>
              <DeleteIcon style={{ fontSize: 50 }} color="disabled" />
            </IconButton>
          </div>
        </>
      </Modal>
    </>
  );
};
