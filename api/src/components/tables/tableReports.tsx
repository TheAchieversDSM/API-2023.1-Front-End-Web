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
                        <th>Estação</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.map((reports) => (
                        <tr key={reports?.report_id}>
                            <td>{reports?.report_id}</td>
                            <td>{reports?.valorEmitido}</td>
                            <td>{reports?.unixtime}</td>
                            <td>{reports?.alerta.nome}</td>
                            <td>{reports?.nivelAlerta}</td>
                            <td>{reports?.tipoParametro}</td>
                            <td>{reports?.estacao_uid}</td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}