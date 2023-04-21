import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { parseCookies } from "nookies";

interface IReport {
    report_id: number;
    unixtime: number;
    valorEmitido: number;
    tipoParametro: number;
    estacao_uid: number;
    nivelAlerta?: number;
    alerta: [{
        nome: string;
    }]
}

export default function TableReport() {
    const [report, setReports] = useState<IReport[]>([])
    const { uid } = useParams();

    const cookies = parseCookies();

    axios
        .get(`http://localhost:5000/report/pegarReportPelaEstacao/${uid}`, {
            headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
        })
        .then((res) => {
            setReports([res.data]);
        })
        .catch((error) => {
            console.error(error);
    });


    return (
        <div className="box-list box-report">
            <Table className="table" size="sm" >

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Valor</th>
                        <th>UnixTime</th>
                        <th>Alerta</th>
                        <th>Nível</th>
                        <th>Parâmetro</th>
                        <th>Estação</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.map((reports: any) => (
                        <tr>
                            <td>{reports?.report_id}</td>
                            <td>{reports?.valorEmitido}</td>
                            <td>{reports?.unixtime}</td>
                            <td></td>
                            <td>{reports?.nivelAlerta}</td>
                            <td>{reports?.tipoParametro}</td>
                            <td>{reports?.estacao_uid}</td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}