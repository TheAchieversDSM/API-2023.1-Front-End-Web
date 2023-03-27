import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableAlert from '../components/tables/tableAlert';
import TableReport from '../components/tables/tableReports';


export default function Reports() {
    return (
        <>
            <Sidebar />
            <h1 className="TitImp">Reports do Alerta ID/Nome</h1>
            <TableReport/>
        </>
    )
}