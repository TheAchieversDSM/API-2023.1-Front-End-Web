import React from 'react';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'

import '../styles/criar-estacoes.css'
import { Col, Row } from 'react-bootstrap';

export default function Estacoes() {
    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1>Cadastro de Estações</h1>
                
                <div className="box-create">
                    <Row className="create-station-content">
                        <Col md={11}>
                            <Input
                                label="Nome da Estação"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome da estação."
                            />
                        </Col>
                    </Row>

                    <Row className="create-station-content">
                        <Col md={5}>
                            <Input
                                label="Latitude"
                                size="mb-6"
                                type="number"
                                placeholder="Insira a latitude da estação."
                            />
                        </Col>

                        <Col md={6}>
                            <Input
                                label="Longitude"
                                size="mb-6"
                                type="number"
                                placeholder="Insira longitude da estação."
                            />
                        </Col>
                    </Row>

                    <Row className="create-station-content">
                        <Col md={6}>
                            <Input
                                label="UID"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o UID da estação."
                            />
                        </Col>

                        <Col md={5}>
                            <Input
                                label="UTC"
                                size="mb-6"
                                type="text"
                                placeholder="Insira a UTC do local."
                            />
                        </Col>
                    </Row>
                    
                    <Row className="create-station-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Parâmetros"
                                size="mb-3"
                                name="Parametro"
                                placeholder="Selecione o(s) parâmetro(s) correspondente(s)."
                                options={[]}
                                onChange={null}
                                close={false}
                            />
                        </Col>
                    </Row>

                    <Row className="create-station-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Alertas"
                                size="mb-3"
                                name="Alertas"
                                placeholder="Selecione o(s) alerta(s) correspondente(s)."
                                options={[]}
                                onChange={null}
                                close={false}
                            />
                        </Col>
                    </Row>

                    <div className="create-station-button">
                        <Button label="Criar!"/>
                    </div>
                </div>
            </div>
        </>
    )
}