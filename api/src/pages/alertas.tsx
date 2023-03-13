import React from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableAlert from '../components/tables/tableAlert';


export default function Alerts() {
    return (
        <>
            <Sidebar />
            <h1>Alertas</h1>
            <Search/>
            <TableAlert/>
        </>
    )
}