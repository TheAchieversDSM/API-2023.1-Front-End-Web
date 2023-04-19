import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { parseCookies } from "nookies";

// components ✨
import { Col, Row } from "react-bootstrap";
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Swal from 'sweetalert2'

import "../styles/criar-alertas.css";

import { AuthContext } from "../hooks/useAuth";

const options = [
  { value: 1, label: "Atenção" },
  { value: 2, label: "Perigo" },
  { value: 3, label: "Crítico" },
];

const { Select } = Form;

export default function CriarAlertas() {
  const cookies = parseCookies();
  const { user } = useContext(AuthContext);
  
    const nivel = { value: "", label: "" };

    const [parametros, setParametros] = useState<{ label: any; value: any; }[]>([]);

    const [alerta, setAlerta] = useState({
        nome: "",
        valorMin: "",
        valorMax: "",
        nivel: nivel.value,
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
        console.log( {
            nome: alerta.nome,
            valorMinimo: alerta.valorMin,
            valorMax: alerta.valorMax,
            nivel: alerta.nivel,
            parametro_id: parseInt(alerta.parametro_id)
        })

        axios.post(
        `http://localhost:5000/alerta/cadastro`,
        {
          nome: alerta.nome,
          valorMinimo: alerta.valorMin,
          valorMax: alerta.valorMax,
          nivel: alerta.nivel,
          parametro_id: alerta.parametro_id

        },
        {
          headers: {
            Authorization: `Bearer ${cookies["tecsus.token"]}`,
          },
        }).then((res) => {

        });

        Swal.fire({
            title: 'Alerta cadastrado!',
            text: `A alerta ${alerta.nome} foi cadastrado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    };

    console.log(parametros);

    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:5000/parametro/pegarParametros`).then((res) => {
                setParametros(res.data);
            })

            axios.get(`http://localhost:5000/parametro/pegarParametros`).then((res) => {
                var param = []

                for (let index = 0; index < res.data.length; index++) {
                    const opt = { label: res.data[index].nome, value: res.data[index].parametro_id }

                    param.push(opt)
                }

                setParametros(param);
            })
        }

        render();
    }, []);

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
                        <Col md={5}>
                            <Form.Label>Nível</Form.Label>
                            <Select onChange={handleChangeSelect}>
                                {options.map((option) => (
                                    <option key={option?.value} value={option?.value}>
                                        {option?.label}
                                    </option>
                                ))}
                            </Select>
                        </Col>

                        <Col md={6}>
                            <SelectMulti
                                label="Parâmetros"
                                size="mb-3"
                                name="parametro"
                                placeholder="Selecione o parâmetro correspondente."
                                options={parametros}
                                onChange={(e: any) => { handleChangeSelectParametro(e); }}
                                close={true}
                            />
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