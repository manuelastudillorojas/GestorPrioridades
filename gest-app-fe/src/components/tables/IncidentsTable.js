import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../..//Utils/Common';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


let columns: GridColDef = [
    { field: "id", hide: true },
    { field: "col1", headerName: "ID", width: 100 },
    { field: "col2", headerName: "Hora de registro", width: 180 },
    { field: "col3", headerName: "Estado", width: 100 },
    { field: "col4", headerName: "Puntaje de prioridad", width: 100 },
    { field: "col5", headerName: "Descripción", width: 200 },
    { field: "col6", headerName: "Cliente", width: 100 },
    { field: "col7", headerName: "Severidad", width: 100 },
    { field: "col8", headerName: "Criticidad", width: 100 },
    { field: "col9", headerName: "Tiempo atrasado", width: 100 }
];

function IncidentTable(props) {

    const [evento, setEvento] = useState([]);

    useEffect(() => {

        let config = {
            method: 'get',
            url: 'http://localhost:3010/custom/',
            headers: { 
              'authorization': getToken()
            }
          };

        axios(config).then(response => {

            setEvento(response.data)

        }).catch(error => {
            console.log('error', error)
        });

    }, []);  
 
    let objRow = [];

    if(evento.datos) {
        evento.datos.forEach(fila => {
            
            objRow.push({
                id: fila.id_evento,
                col1: fila.id_evento,
                col2: fila.hora_registro,
                col3: fila.estado,
                col4: fila.puntaje_prio,
                col5: fila.descripcion,
                col6: fila.cliente,
                col7: fila.criticidad,
                col8: fila.severidad,
                col9: '1h 23m'
            })
        }); 
    }

    let rows: GridRowsProp = objRow;

    return (
        <div style={{ height: 300, width: "70%" }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );

}

export default IncidentTable;