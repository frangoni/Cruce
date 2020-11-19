import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'company', headerName: 'Empresa', width: 150 },
    {
        field: 'accepted',
        headerName: 'Aceptado',
        width: 100,
        sortable: true,
        valueGetter: (params) => params.getValue("accepted") ? "Aceptado" : "Pendiente"

    },

];








const rows = [
    { id: 1, name: 'Seba', email: "seba.wetzel@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 2, name: 'Feli', email: "feli@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 3, name: 'Fran', email: "fran@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 4, name: 'Gus', email: "gus@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 5, name: 'Lucas', email: "lucas@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 6, name: 'Joaco', email: "joaco@gmail.com", company: "Motoneta veloz", accepted: true },
    { id: 7, name: 'Lara', email: "lara@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 8, name: 'Lucho', email: "lucho@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 9, name: 'Dani', email: "dani.gordoli@gmail.com", company: "Motoneta veloz", accepted: false },
    { id: 10, name: 'Vitto', email: "vitto@gmail.com", company: "Motoneta veloz", accepted: true },
];

function DataTable() {
    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} loading pageSize={10} />
        </div>
    );
}





const UsersPanel = props => {




    return (
        <div>
            <DataTable />
        </div>
    )
}

export default UsersPanel