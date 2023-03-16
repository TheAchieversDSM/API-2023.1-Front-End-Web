import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/sidebar';

import '../styles/dashboard.css'
import Chart from '../components/chart';

export default function Dashboard() {
    return (
        <>
            <Sidebar />
            <div className='main-body'>
                <h1>Estação Fatec-SJC</h1>
                <Container>
                    <Row>
                        <Col className=''>
                                
                        </Col>
                        <Col className=''>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </>
    )
}