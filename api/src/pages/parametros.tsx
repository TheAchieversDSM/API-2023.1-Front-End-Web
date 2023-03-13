import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableGlobal from '../components/table';


export default function Parametros() {
    return (
        <>
            <Sidebar />
            <h1>Parâmetros</h1>
            <Search/>
            <TableGlobal id="ID" nome="Nome" titulo1="Tipo" titulo2="Unidade de medida"/>
        </>
    )
}