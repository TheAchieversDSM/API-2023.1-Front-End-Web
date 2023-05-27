import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableAlert from '../components/tables/tableAlert';
import TableReport from '../components/tables/tableReports';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { parseCookies } from "nookies";
import url from '../services/config';

interface modelo  {
        'estacao_uid': '',
}

export default function Reports() {
    const cookies = parseCookies();

    const [estacao, setEstacao] = useState<modelo[]>([])
    const { uid } = useParams();

    useEffect(() =>{
        function render(){
            axios.get(`${url.baseURL}/report/pegarReportPelaEstacao/${uid}`, {
                headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
              }).then((res) =>{
                setEstacao(res.data)
            })
        }
        render()
    },[uid])

    return (
        <>
            <Sidebar />
            {estacao?.map((estacoes:any) => (
                <h1 className="TitImp">Reports (UID: {estacoes.estacao_uid})</h1>
            ))}
            <TableReport/>
        </>
    )
}