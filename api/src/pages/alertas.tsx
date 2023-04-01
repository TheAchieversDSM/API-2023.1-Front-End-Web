import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableAlert from '../components/tables/tableAlert';


export default function Alertas() {
    return (
        <>
            <Sidebar />
            <h1 className="TitImp">Alertas</h1>
            <TableAlert/>
        </>
    )
}