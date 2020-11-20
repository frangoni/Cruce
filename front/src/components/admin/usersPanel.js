import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCadetes } from '../../redux/actions/users'
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


function DataTable({ cadetes }) {
    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={cadetes} columns={columns} pageSize={10} />
        </div>
    );
}



const UsersPanel = props => {
    const dispatch = useDispatch();
    const cadetes = useSelector(state => state.users.cadetes)
    useEffect(() => {
        dispatch(fetchCadetes())
        return () => { }
    }, [])

    return (
        <div>
            <DataTable cadetes={cadetes} />
        </div>
    )
}

export default UsersPanel