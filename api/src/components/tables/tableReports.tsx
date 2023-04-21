import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { parseCookies } from "nookies";

interface IReport {
    report_id: number;
    unixtime: number;
    estacao_uid: number;
    valorEmitido: number;
    tipoParametro: number;
    nivelAlerta?: number;
    alerta: {
        nome?: string;
    }
}

export default function TableReport() {
    const [report, setReports] = useState<IReport[]>([])
    const { uid } = useParams();

    const cookies = parseCookies();

    useEffect(() => {
        const fetchReports = async () => {
          const cookies = parseCookies();
          try {
            const response = await axios.get(`http://localhost:5000/report/pegarReportPelaEstacao/${uid}`, {
              headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
            });
            setReports(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchReports();
      }, [uid]);

      function formatDate(unixtime: number): string {
        const date = new Date(unixtime * 1000);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
      }

    return (
        <div className="box-list box-report">
            <Table className="table" size="sm" >

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Valor</th>
                        <th>Unixtime</th>
                        <th>Alerta</th>
                        <th>Nível</th>
                        <th>Parâmetro</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.map((reports) => (
                        <tr key={reports?.report_id}>
                            <td>{reports?.report_id}</td>
                            <td>{reports?.valorEmitido}</td>
                            <td>{formatDate(reports?.unixtime)}</td>
                            <td>{reports?.alerta.nome}</td>
                            <td>{reports?.nivelAlerta}</td>
                            <td>{reports?.tipoParametro}</td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}