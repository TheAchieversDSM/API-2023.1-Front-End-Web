import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

let modelo = [
    {
        'id': '',
        'nomeAlerta':'',
        'id_estacao': '',
        'unixTime': '',
        'nivel': ''
    }
]

export default function TableReport() {
    const [reports, setReports] = useState(modelo)

  return (
    <div className="box-list box-report">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome do Alerta</th>
                    <th>UnixTime</th>
                    <th>Nível</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}