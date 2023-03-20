import React from 'react';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'

import '../styles/criar-alertas.css'
import { Col, Row } from 'react-bootstrap';

export default function CriarAlertas() {
    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1>Cadastro de Alertas</h1>
                
                <div className="box-create">
                    <Row className="create-alert-content">
                        <Col md={6}>
                            <Input
                                label="Estação (ID/Nome)"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o ID/nome da estação."
                                onChange={""}
                            />
                        </Col>

                        <Col md={5}>
                            <Input
                                label="Valor"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o valor para acionar o alerta."
                                onChange={""}
                            />
                        </Col>
                    </Row>
                    
                    <Row className="create-alert-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Parâmetro"
                                size="mb-3"
                                name="Parametro"
                                placeholder="Selecione o parâmetro correspondente."
                                options={[]}
                                onChange={null}
                                close={true}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">
                        <Col md={11}>
                            <TextareaInput
                                label="Mensagem"
                                placeholder="Insira a mensagem que deve aparecer ao alerta ser acionado."
                                height="100px"
                                onChange={""}
                            />
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button type="submit" label="Criar!" onClick={""}/>
                    </div>
                </div>
            </div>
        </>
    )
}