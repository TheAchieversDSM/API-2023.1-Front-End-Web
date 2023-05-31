import React, { useEffect, useState } from "react";
import axios from "axios";

// components ✨
import { Col, Form, Row } from "react-bootstrap";
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Swal from 'sweetalert2'

import { parseCookies } from "nookies";

import "../styles/criar-estacoes.css";

const modelo = [{ value: "", label: "" }];

export default function CriarEstacoes() {
    const cookies = parseCookies();

    const parametro = [{ parametroParametroId: "" }];
    const [parametros, setParametros] = useState(modelo);

    const [estacao, setEstacao] = useState({
        nome: "",
        latitude: "",
        longitude: "",
        parametro: parametro,
        uid: "",
        utc: "",
    });

    // inputs' handleChange ✨
    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setEstacao((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });

        console.log(estacao);
        
    };

    // select's handleChange ✨
    const handleChangeSelect = (event: any) => {
        var parameters: any[] = [];

        if (event.length != 0 && event) {
            for (let i = 0; i < event.length; i++) {
                let option = { parametroParametroId: event[i].value };
                parameters.push(option);
            }

            estacao.parametro = parameters;

            // setEstacao(estacao);
        }
    };

    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        event.preventDefault();

        axios.post(`http://localhost:5000/estacao/cadastro`,
            {
                nome_estacao: estacao.nome,
                latitude: estacao.latitude,
                longitude: estacao.longitude,
                uid: estacao.uid,
                utc: estacao.utc,
                parametros: estacao.parametro,
            },
            {
                headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` }
            }).then((res) => {

            }).catch((err) => {
                console.log(err);
            });

        Swal.fire({
            title: 'Estação cadastrada!',
            text: `A estação ${estacao.nome} foi cadastrada com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    };

    // get unidade de medidas & tipos de parâmetros ✨
    useEffect(() => {
        async function render() {
            axios
                .get(`http://localhost:5000/parametro/pegarParametros`, {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` }})
                .then((res) => {
                    const parametro = [{ value: "", label: "" }];

                    for (let index = 0; index <= res.data.length - 1; index++) {
                        let option = {
                            value: res.data[index].parametro_id,
                            label: res.data[index].nome,
                        };

                        parametro.push(option);
                    }

                    setParametros(parametro);
                });
        }

        render();
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Sidebar />
                <div className="main-body">
                    <h1 className="TitImp">Cadastro de Estações</h1>
                    <div className="box-create-station">
                        <Row className="create-station-content">
                            <Col md={11}>
                                <Input
                                    label="Nome da Estação"
                                    name="nome"
                                    size="mb-6"
                                    type="text"
                                    placeholder="Insira o nome da estação."
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="create-station-content">
                            <Col md={5}>
                                <Input
                                    label="Latitude"
                                    name="latitude"
                                    size="mb-6"
                                    type="number"
                                    placeholder="Insira a latitude da estação."
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    label="Longitude"
                                    name="longitude"
                                    size="mb-6"
                                    type="number"
                                    placeholder="Insira longitude da estação."
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="create-station-content">
                            <Col md={6}>
                                <Input
                                    label="UID"
                                    name="uid"
                                    size="mb-6"
                                    type="text"
                                    placeholder="Insira o UID da estação."
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={5}>
                                <Input
                                    label="UTC"
                                    name="utc"
                                    size="mb-6"
                                    type="text"
                                    placeholder="Insira a UTC do local."
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="create-station-content">
                            <Col md={11}>
                                <SelectMulti
                                    label="Parâmetros"
                                    size="mb-3"
                                    name="parametro"
                                    placeholder="Selecione o(s) parâmetro(s) correspondente(s)."
                                    options={parametros}
                                    onChange={(e: any) => {
                                        handleChangeSelect(e);
                                    }}
                                    close={false}
                                />
                            </Col>
                        </Row>
                        <div className="create-station-button">
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
        </>
    );
}