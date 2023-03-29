import React, { useState } from 'react'
import axios from 'axios'

// components ✨
import CreatableSelect from 'react-select/creatable';
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'

import '../styles/criar-parametros.css'
import { Col, Form, Row } from 'react-bootstrap';

const options = [{ value: '1', label: 'teste' }, {  value: '2', label: 'testinho' }]

export default function CriarParametros() {

    const tipoParametro = { value: '', label: '' }
    const unidade = { value: '', label: '' }

    const [parametros, setParametros] = useState({
        nome: '',
        formula: '',
        tipoParametro: tipoParametro,
        unidade: unidade,
        fator: '',
        offset: ''
    })

    // inputs' handleChange ✨
    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setParametros((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });

        console.log(parametros);

    };

    // select's handleChange ✨
    const handleChangeSelectTipo = (event: any) => {
        if (event.length != 0 && event) {
            setParametros((prevState) => {
                return {
                    ...prevState,
                    tipoParametro: {
                        value: event.value,
                        label: event.label,
                    },
                };
            });
        }
    };

    const handleChangeSelectUnidade = (event: any) => {
        if (event.length != 0 && event) {
            console.log(event.value);
            
            setParametros((prevState) => {
                return {
                    ...prevState,
                    unidade: {
                        value: event.value,
                        label: event.label,
                    },
                };
            });
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post(`http://localhost:5000/parametro/cadastro`, {
            tipo_parametro: parametros.tipoParametro,
            formula_parametro: parametros.formula,
            nome_parametro: parametros.nome,
            unidadeDeMedida_parametro: parametros.unidade,
            offset_parametro: parametros.offset,
            fator_parametro: parametros.fator
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        })

        alert('Parâmetro cadastrado!');

        setParametros({
            nome: "",
            formula: "",
            tipoParametro: tipoParametro,
            unidade: unidade,
            fator: "",
            offset: ""
        });
    };

    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1 className="TitImp">Cadastro de Parâmetros</h1>

                <div className="box-create-parameters">
                    <Row className="create-parameters-content">
                        <Col md={11}>
                            <Input
                                label="Nome"
                                name="nome"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome do parâmetro."
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={11}>
                            <TextareaInput
                                label="Fórmula/Explicação"
                                name="formula"
                                placeholder="Insira a fórmula e, se necessário, explicação para chegar no valor ideal."
                                height="100px"
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={6}>
                            <Form.Label className="label">Tipo de Parâmetro</Form.Label>
                            <CreatableSelect
                                isClearable
                                value={[{ value: parametros.tipoParametro.value,label: parametros.tipoParametro.label }]}
                                name="tipoParamentro"
                                placeholder="Selecione o tipo correspondente do parâmetro."
                                onChange={(e: any) => { handleChangeSelectTipo(e) }}
                                options={options}
                            />
                        </Col>

                        <Col md={5}>
                            <Form.Label className="label">Unidade de Medida</Form.Label>
                            <CreatableSelect
                                isClearable
                                value={[{ value: parametros.unidade.value, label: parametros.unidade.label }]}
                                name="unidade"
                                placeholder="Selecione a unidade de medida do parâmetro."
                                onChange={(e: any) => { handleChangeSelectUnidade(e) }}
                                options={options}
                            />
                        </Col>
                    </Row>

                    <Row className="create-parameters-content">
                        <Col md={5}>
                            <Input
                                label="Fator"
                                name="fator"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o fator do parâmetro."
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6}>
                            <Input
                                label="Offset"
                                name="offset"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o offset do parâmetro."
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button type="submit" label="Criar!" className="btnCriar" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}