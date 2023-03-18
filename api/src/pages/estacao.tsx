import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableEst from '../components/tables/tableEst';


export default function Estacao() {
    return (
        <>
            <Sidebar />
            <h1>Estações</h1>
            <Search link="../criar-estacoes"/>
            <TableEst/>
        </>
    )
}