import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableGlobal from '../components/table';


export default function Usuarios() {
    return (
        <>
            <Sidebar />
            <h1>Usuários</h1>
            <Search/>
            <TableGlobal id="ID" nome="Nome" titulo1="Email" titulo2="Nível"/>    
        </>
    )
}