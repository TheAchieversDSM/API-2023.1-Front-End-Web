import React, { useState } from 'react'
import axios from 'axios'

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'

import '../styles/criar-parametros.css'
import { Col, Row } from 'react-bootstrap';

const options = [ {value: '1', label: 'teste'} ]

export default function CriarParametros() {

    const tipoParametro = { value: '', label: '' }

    const [parametros, setParametros] = useState({
        nome: '',
        formula: '',
        tipoParametro: tipoParametro,
        unidade: '',
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
    };

    // select's handleChange ✨
    const handleChangeSelect = (event: any) => {       
        if (event.length != 0 && event) {
            setParametros((prevState) => {
                return {
                    ...prevState,
                    tipoParametro: event[0].value,
                };
            });               
        }  
    };

    const handleSubmit = (event: any) => { 
        event.preventDefault();
        
        axios.post(`http://localhost:5000/parametro/cadastro`, {
            tipo_parametro: parametros.tipoParametro,
            //colocar o campo de fórmula aqui
            nome_parametro: parametros.nome,
            unidadeDeMedida_parametro: parametros.unidade,
            offset_parametro: parametros.offset,
            fator_parametro: parametros.fator
        }).then((res) => {

        })

        alert('Parâmetro cadastrado!');

        setParametros({
            nome: "",
            formula: "",
            tipoParametro: tipoParametro,
            unidade: "",
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
                        <Col md={7}>
                            <SelectMulti
                                label="Tipo de Parâmetro"
                                value={parametros.tipoParametro.label}
                                size="mb-3"
                                name="tipoParamentro"
                                placeholder="Selecione o tipo correspondente do parâmetro."
                                options={options}
                                onChange={(e: any) => {handleChangeSelect(e)}}
                                close={true}
                            />
                        </Col>

                        <Col md={4}>
                            <Input
                                label="Unidade de Medida"
                                name="unidade"
                                size="mb-6"
                                type="text"
                                placeholder="Insira a unidade de medida."
                                onChange={handleChange}
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