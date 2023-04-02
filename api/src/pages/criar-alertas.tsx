import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
// components ✨
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";

import "../styles/criar-alertas.css";
import { Col, Row } from "react-bootstrap";

const options = [
    { value: 1, label: "Atenção" },
    { value: 2, label: "Perigo" },
    { value: 3, label: "Crítico" },
];

const { Select } = Form;

export default function CriarAlertas() {
    const nivel = { value: "", label: "" };

    const [alerta, setAlerta] = useState({
        nome: "",
        valorMin: "",
        valorMax: "",
        nivel: nivel,
    });

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
                    nivel: event.target.value,
                };
            });
        }
    };

    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }
        
        event.preventDefault();
        axios
            .post(`http://localhost:5000/alerta/cadastro`, {
                nome: alerta.nome,
                valorMinimo: alerta.valorMin,
                valorMax: alerta.valorMax,
                nivel: alerta.nivel,
            })
            .then((res) => { });

        alert("Alerta cadastrado!")
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Sidebar />

            <div className="main-body">
                <h1 className="TitImp">Cadastro de Alertas</h1>

                <div className="box-create">
                    <Row className="create-alert-content">
                        <Col md={11}>
                            <Input
                                label="Nome do alerta"
                                name="nome"
                                size="mb-6"
                                type="text"
                                value={alerta.nome}
                                placeholder="Insira o nome do alerta."
                                onChange={handleChange}
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
                            <Form.Label>Nível</Form.Label>
                            <Select onChange={handleChangeSelect}>
                                {options.map((option) => (
                                    <option key={option?.value} value={option?.value}>
                                        {option?.label}
                                    </option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button
                            type="submit"
                            label="Criar!"
                            className="btnCriar"
                            /* onClick={handleSubmit} */
                        />
                    </div>
                </div>
            </div>
        </Form>
    );
}