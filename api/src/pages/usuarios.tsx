import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableUsu from '../components/tables/tableUsu';


export default function Usuarios() {
    return (
        <>
            <Sidebar />
            <h1 className="TitImp">Usuários</h1>
            <Search link="../criar-usuarios"/>
            <TableUsu />    
        </>
    )
}