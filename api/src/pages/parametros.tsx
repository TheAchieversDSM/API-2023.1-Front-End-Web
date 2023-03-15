import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TablePar from '../components/tables/tablePar';


export default function Parametros() {
    return (
        <>
            <Sidebar />
            <h1>Parâmetros</h1>
            <Search/>
            <TablePar/>
        </>
    )
}