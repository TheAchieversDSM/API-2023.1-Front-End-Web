import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// components ✨
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Swal from 'sweetalert2'

import { parseCookies } from "nookies";

import "../styles/criar-alertas.css";
import url from "../services/config";

const options = [
    { value: 1, label: "Atenção" },
    { value: 2, label: "Perigo" },
    { value: 3, label: "Crítico" },
];

interface IAlerta {
    nome?: string;
    valorMinimo?: string;
    valorMax?: string;
    nivel?: number;
    parametro: {parametro_id?: number};
}

export default function EditarAlertas() {
    const cookies = parseCookies();

    const { Select } = Form;

    const { id } = useParams();

    const nivel = { value: 0, label: "" };

    const [parametros, setParametros] = useState<{ label: any; value: any; }[]>([]);

    const [alerta2, setAlerta2] = useState<IAlerta>()

    const [alerta, setAlerta] = useState({
        nome: "",
        valorMin: "",
        valorMax: "",
        nivel: "",
        parametro_id: ""
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

    const handleChangeSelectParametro = (event: any) => {
        if (event.length != 0 && event) {
            setAlerta((prevState) => {
                return {
                    ...prevState,
                    parametro_id: event[0].value,
                };
            });
        }
    };

    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        event.preventDefault();

        if (alerta.nome.length === 0) {
            alerta.nome = alerta2?.nome ?? ''
        }
        if (alerta.valorMin.length === 0) {
            alerta.valorMin = alerta2?.valorMinimo ?? ''
        }
        if (alerta.valorMax.length === 0) {
            alerta.valorMax = alerta2?.valorMax ?? ''
        }
        if (alerta.nivel.length === 0) {
            alerta.nivel = alerta2?.nivel?.toString() ?? ''
        }

        axios.put(`${url.baseURL}/alerta/atualizarAlertaPorId/${id}`, {
            nome: alerta.nome,
            valorMinimo: alerta.valorMin,
            valorMax: alerta.valorMax,
            nivel: parseInt(alerta.nivel),
            parametro_id: Number(alerta2?.parametro.parametro_id)
        },
            { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
        ).then((res) => {

        });

        Swal.fire({
            title: 'Alerta atualizado!',
            text: `O alerta ${alerta.nome} foi atualizado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    };

    useEffect(() => {
        async function render() {
            axios.get(`${url.baseURL}/alerta/pegarAlertasPorId/${id}`,
                {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
                }).then((res) => {
                    setAlerta2(res.data)
                })

            axios.get(`${url.baseURL}/parametro/pegarParametros`,
                {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
                }).then((res) => {
                var param = []

                for (let index = 0; index < res.data.length; index++) {
                    const opt = { label: res.data[index].nome, value: res.data[index].parametro_id }

                    param.push(opt)
                }

                setParametros(param);
            })
        }

        render()
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <Sidebar />

            <div className="main-body">
                <h1 className="TitImp">Edição de Alertas</h1>

                <div className="box-create">
                    <Row className="create-alert-content">
                        <Col md={11}>
                            <Input
                                label="Nome do alerta"
                                name="nome"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome do alerta."
                                onChange={handleChange}
                                default={alerta2?.nome}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">

                        <Col md={6}>
                            <Input
                                label="Valor Máximo"
                                name="valorMax"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o valor máximo do alerta."
                                onChange={handleChange}
                                default={alerta2?.valorMax}
                            />
                        </Col>

                        <Col md={5}>
                            <Input
                                label="Valor Mínimo"
                                name="valorMin"
                                size="mb-6"
                                type="number"
                                placeholder="Insira o valor mínimo do alerta."
                                onChange={handleChange}
                                default={alerta2?.valorMinimo}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">
                        <Col md={11}>
                            <Form.Label>Nível</Form.Label>
                            <Select onChange={handleChangeSelect} value={alerta.nivel}>
                                {options.map((option) => (
                                    <option key={option?.value} value={option?.value}>
                                        {option?.label}
                                    </option>
                                ))}
                            </Select>
                        </Col>

                        {/* <Col md={6}>
                            <SelectMulti
                                label="Parâmetros"
                                size="mb-3"
                                name="parametro"
                                placeholder="Selecione o parâmetro correspondente."
                                options={parametros}
                                onChange={(e: any) => { handleChangeSelectParametro(e); }}
                                close={false}
                            />
                        </Col> */}
                    </Row>

                    <div className="create-alert-button">
                        <Button
                            type="submit"
                            label="Editar!"
                            className="btnCriar"
                        /* onClick={handleSubmit} */
                        />
                    </div>
                </div>
            </div>
        </Form>
    );
}