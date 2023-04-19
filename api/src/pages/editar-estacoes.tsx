import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

// components ✨
import { Col, Form, Row } from "react-bootstrap";
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Swal from 'sweetalert2'

import "../styles/criar-estacoes.css";

export default function EditarEstacoes() {

    const { id } = useParams();

    const [estacao2, setEstacao2] = useState({
        nome: "",
        lati: "",
        long: "",
        UTC: "",
    })

    const [estacao, setEstacao] = useState({
        nome: "",
        latitude: "",
        longitude: "",
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
    };
    
    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        event.preventDefault();

        if (estacao.nome.length === 0) {
            estacao.nome = estacao2?.nome ?? ''
        }
        if (estacao.latitude.length === 0) {
            estacao.latitude = estacao2?.lati ?? ''
        }
        if (estacao.longitude.length === 0) {   
            estacao.longitude = estacao2?.long ?? ''
        }
        if (estacao.utc.length === 0) {
            estacao.utc = estacao2?.UTC ?? ''
        }

        axios.put(`http://localhost:5000/estacao/atualizarEstacao/${id}`, {
            nome_estacao: estacao.nome,
            latitude: estacao.latitude,
            longitude: estacao.longitude,
            utc: estacao.utc,
        }).then((res) => { 

        }).catch((err) => {
            console.log(err);
        });

        Swal.fire({
            title: 'Estação atualizada!',
            text: `A estação ${estacao.nome} foi atualizada com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })    
    };
    
    // get unidade de medidas & tipos de parâmetros ✨
    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:5000/estacao/pegarEstacoesPorId/${id}`).then((res) => {
                setEstacao2(res.data)               
            })
        }

        render();
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Sidebar />
                <div className="main-body">
                    <h1 className="TitImp">Edição de Estações</h1>
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
                                    default={estacao2?.nome}
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
                                    default={estacao2?.lati}
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
                                    default={estacao2?.long}
                                />
                            </Col>
                        </Row>
                        <Row className="create-station-content">
                            <Col md={11}>
                                <Input
                                    label="UTC"
                                    name="utc"
                                    size="mb-6"
                                    type="text"
                                    placeholder="Insira a UTC do local."
                                    onChange={handleChange}
                                    default={estacao2?.UTC}
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