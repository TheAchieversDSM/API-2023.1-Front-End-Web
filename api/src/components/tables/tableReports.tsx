import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { parseCookies } from "nookies";

interface IReport {
    report_id: number;
    unixtime: number;
    msg?: string;
    estacao_uid: number;
    alerta: [{
        nome: number;
        nivel?: number;
    }]
}

export default function TableReport() {
    const [report, setReports] = useState<IReport[]>([])
    const { id } = useParams();

    const cookies = parseCookies();

    useEffect(() => {
        function render() {
            axios
                .get(`http://localhost:5000/alerta/pegarReportsAtravesDoAlerta/${id}`, {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
                })
                .then((res) => {
                    setReports([res.data]);
                });
        }
        render();
    }, []);

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
                            <td>{reports.report_id}</td>
                            <td>valor emitido</td>
                            <td>{reports.unixtime}</td>
                            <td>{reports.alerta.nome}</td>
                            <td>{reports.alerta.nivel}</td>
                            <td>parametro</td>
                            <td>{reports.estacao_uid}</td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}