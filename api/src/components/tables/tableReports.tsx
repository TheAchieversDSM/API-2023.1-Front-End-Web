import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface IReport 
    {
        reports_id: number;
        reports_unixtime: number;
        reports_nivel?: number;
        alerta_nome?: string;
    }

export default function TableReport() {
    const [report, setReports] = useState<IReport[]>([])
    const { id } = useParams();

    useEffect(()=>{
        function render(){
            axios.get(`http://localhost:5000/alerta/pegarReportsAtravesDoAlerta/${id}`).then((res)=>{
                setReports([res.data])
            }
            )
        }
        render()
    }, [])

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
                {report? report?.map(reports =>
                <tr>
                    <td>{reports.reports_id}</td>
                    <td>{reports?.alerta_nome}</td>
                    <td>{reports.reports_unixtime}</td>
                    <td>{reports?.reports_nivel}</td>
                </tr>):<></>}
            </tbody>
        </Table>
    </div>
  )
}