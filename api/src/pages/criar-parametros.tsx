import React from 'react'

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'

import '../styles/criar-parametros.css'
import { Col, Row } from 'react-bootstrap';

export default function CriarParametros() {
    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1>Cadastro de Parâmetros</h1>

                <div className="box-create-parameters">
                    <Row className="create-parameters-content">
                        <Col md={11}>
                            <Input
                                label="Nome"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome do parâmetro."
                                onChange={""}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={11}>
                            <TextareaInput
                                label="Fórmula/Explicação"
                                placeholder="Insira a fórmula e, se necessário, explicação para chegar no valor ideal."
                                height="100px"
                                onChange={""}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={7}>
                            <SelectMulti
                                label="Tipo de Parâmetro"
                                size="mb-3"
                                name="parametro"
                                placeholder="Selecione o tipo correspondente do parâmetro."
                                options={[]}
                                onChange={null}
                                close={true}
                            />
                        </Col>

                        <Col md={4}>
                            <Input
                                label="Unidade de Medida"
                                size="mb-6"
                                type="text"
                                placeholder="Insira a unidade de medida."
                                onChange={""}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={5}>
                            <Input
                                label="Fator"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o fator do parâmetro."
                                onChange={""}
                            />
                        </Col>

                        <Col md={6}>
                            <Input
                                label="Offset"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o offset do parâmetro."
                                onChange={""}
                            />
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button type="submit" label="Criar!" onClick={""} />
                    </div>
                </div>
            </div>
        </>
    )
}