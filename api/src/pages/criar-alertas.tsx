import React, { useState } from 'react';
import axios from 'axios';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'

import '../styles/criar-alertas.css'
import { Col, Row } from 'react-bootstrap';

const options = [ {value: '1', label: 'teste'} ]

export default function CriarAlertas() {

    const parametro = { value: '', label: '' }

    const [alerta, setAlerta] = useState({
        nome: '',
        valorMin: '',
        valorMax: '',
        estacao: parametro,
        parametro: parametro,
        nivel: parametro,
    })

    // inputs' handleChange ✨
    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setAlerta((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    // select's handleChange ✨
    const handleChangeSelect = (event: any) => {       
        if (event.length != 0 && event) {
            setAlerta((prevState) => {
                return {
                    ...prevState,
                    parametro: event[0].value,
                    estacao: event[0].value,
                    nivel: event[0].value,
                };
            });               
        }  
        console.log(alerta);
    };

    const handleSubmit = (event: any) => { 
        event.preventDefault();
        
        axios.post(`http://localhost:5000/alerta/cadastro`, {
            id_estacao: alerta.estacao,
            id_parametro: alerta.parametro,
            nome: alerta.nome,
            valorMinimo: alerta.valorMin,
            valorMax: alerta.valorMax,
            nivel: alerta.nivel
        }).then((res) => {

        })

        alert('Alerta cadastrado!');

        setAlerta({
            nome: "",
            valorMin: "",
            valorMax: "",
            estacao: parametro,
            parametro: parametro,
            nivel: parametro
        });        
    };

    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1 className="TitImp">Cadastro de Alertas</h1>
                
                <div className="box-create">
                    <Row className="create-alert-content">
                        <Col md={5}>
                            <Input
                                label="Nome do alerta"
                                name="nome"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome do alerta."
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6}>
                            <SelectMulti
                                label="Estação"
                                size="mb-3"
                                name="estacao"
                                placeholder="Selecione a estação correspondente."
                                options={options}
                                onChange={handleChangeSelect}
                                close={true}
                            />
                        </Col>
                    </Row>
                    
                    <Row className="create-alert-content">
                        <Col md={5}>
                            <Input
                                label="Valor Mínimo"
                                name="valorMin"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o valor mínimo do alerta."
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6}>
                            <Input
                                label="Valor Máximo"
                                name="valorMax"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o valor máximo do alerta."
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Parâmetro"
                                size="mb-3"
                                name="parametro"
                                placeholder="Selecione o parâmetro correspondente."
                                options={options}
                                onChange={handleChangeSelect}
                                close={true}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Nível"
                                size="mb-3"
                                name="nivel"
                                placeholder="Selecione o nível correspondente."
                                options={options}
                                onChange={handleChangeSelect}
                                close={true}
                            />
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button type="submit" label="Criar!" className="btnCriar" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}