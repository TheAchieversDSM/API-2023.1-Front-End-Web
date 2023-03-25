import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/sidebar';
import ButtonMain from '../components/button';

import '../styles/dashboard.css'
import Chart from '../components/chart';

export default function Dashboard() {
    const options = {
        chart: {
            type: 'spline',
            width: 1025,
            height: 450
        },
        title: {
            text: 'Temperaturas diárias'
        },
        xAxis: {
            categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        },
        yAxis: {
            title: {
                text: 'Temperatura (°C)'
            }
        },
        series: [{
            name: 'Máxima',
            data: [26, 25, 23, 20, 18, 20, 22]
        }, {
            name: 'Mínima',
            data: [18, 17, 16, 13, 11, 13, 15]
        }],
        tooltip: {
            shared: true,
            valueSuffix: '°C'
        }
    }
    return (
        <>
            <Sidebar />
            <div className='main-body'>
                <h1 className="TitImp">Estação Fatec-SJC</h1>
                <div className='buttons_dashboard'>
                    <ButtonMain label="Todos" />
                    <ButtonMain label="Param-A" />
                    <ButtonMain label="Param-B" />
                </div>
                <div className='container_dashboard'>
                    <Chart className='container_dashboard' options={options} />
                </div>
            </div>

        </>
    )
}