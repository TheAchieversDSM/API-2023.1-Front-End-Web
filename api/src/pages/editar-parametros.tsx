import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

// components ✨
import { Col, Form, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'
import Swal from 'sweetalert2'

import { parseCookies } from "nookies";

import '../styles/criar-parametros.css'
import url from '../services/config';

const modelo = [{ value: '', label: '' }]

interface IParametro {
    parametro_id: number;
    nome?: string;
    formula?: string;
    tipo?: {
        tipo_id: number;
        nome: string;
    };
    unidadeDeMedida?: {
        nome: string;
        unidade_id: number;
    };
    fator?: string;
    offset?: string;
}

export default function EditarParametro() {
    const cookies = parseCookies();

    const { id } = useParams();

    const tipoParametro = { value: '', label: '' }
    const unidade = { value: '', label: '' }
    const [unidadeMedidas, setUnidadeMedidas] = useState(modelo)
    const [tipos, setTipos] = useState(modelo)
    const [parametro, setParametro] = useState<IParametro>()

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

    const createTipoOption = (event: any) => {
        axios.post(`${url.baseURL}/tipoParametro/cadastro`,
            { nome: event },
            { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
          )
          .then((res) => {
            handleChangeSelectTipo({ value: res.data.id, label: event });
          });
      };

    const handleChangeSelectUnidade = (event: any) => {
        if (event.length != 0 && event) {
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

    const createMedidaOption = (event: any) => {
        axios.post(`${url.baseURL}/unidadeMedida/cadastro`,
            { nome: event },
            { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }).then(res => {
                handleChangeSelectUnidade({ value: res.data.id, label: event })
            })
    };

    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        for (let index = 0; index < event.target.querySelectorAll("textarea").length; index++) {
            event.target.querySelectorAll("textarea")[index].value = ""
        }

        event.preventDefault();

        if (parametros.nome.length === 0) {
            parametros.nome = parametro?.nome ?? ''
        }
        if (parametros.formula.length === 0) {
            parametros.formula = parametro?.formula ?? ''
        }
        if (parametros.tipoParametro.value.length === 0) {
            parametros.tipoParametro.value = parametro?.tipo?.tipo_id.toString() ?? ''
        }
        if (parametros.unidade.value.length === 0) {
            parametros.unidade.value = parametro?.unidadeDeMedida?.unidade_id.toString() ?? ''
        }
        if (parametros.fator.length === 0) {
            parametros.fator = parametro?.fator ?? ''
        }
        if (parametros.offset.length === 0) {
            parametros.offset = parametro?.offset ?? ''
        }

        axios.put(`${url.baseURL}/parametro/atualizarParametro/${id}`, {
            tipo_parametro: parseInt(parametros.tipoParametro.value),
            formula_parametro: parametros.formula,
            nome_parametro: parametros.nome,
            unidadeDeMedida_parametro: parseInt(parametros.unidade.value),
            offset_parametro: parametros.offset,
            fator_parametro: parametros.fator
        },
            { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
        ).then((res) => {

        }).catch((err) => {
            console.log(err);
        })

        Swal.fire({
            title: 'Parâmetro atualizado!',
            text: `O parâmetro ${parametros.nome} foi atualizado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    };

    // get unidade de medidas & tipos de parâmetros ✨
    useEffect(() => {
        async function render() {
            axios.get(`${url.baseURL}/unidadeMedida/pegarUnidadeDeMedidas`,
                {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
                }).then((res) => {
                    const unidades = [{ value: '', label: '' }]

                    for (let index = 0; index <= res.data.length - 1; index++) {
                        let option = {
                            value: res.data[index].unidade_id,
                            label: res.data[index].nome
                        }

                        unidades.push(option)
                    }

                    setUnidadeMedidas(unidades)
                });

            axios.get(`${url.baseURL}/tipoParametro/pegarTiposParametro`,
                {
                    headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
                }).then((res) => {
                    const parametrosTipos = [{ value: '', label: '' }]

                    for (let index = 0; index <= res.data.length - 1; index++) {
                        let option = {
                            value: res.data[index].tipo_id,
                            label: res.data[index].nome
                        }

                        parametrosTipos.push(option)
                    }

                    setTipos(parametrosTipos)
                })

            axios.get(`${url.baseURL}/parametro/pegarParametrosPorId/${id}`).then((res) => {
                setParametro(res.data)
            })
        }

        render()
    }, [])

    return (
        <>
            <Form onSubmit={handleSubmit}>

                <Sidebar />

                <div className="main-body">
                    <h1 className="TitImp">Edição de Parâmetros</h1>

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
                                    default={parametro?.nome}
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
                                    default={parametro?.formula}
                                />
                            </Col>
                        </Row>

                        <Row className="create-parameters-content">

                            <Col md={6}>
                                <Form.Label className="label">Tipo de Parâmetro</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    value={[{ value: parametros.tipoParametro.value, label: parametros.tipoParametro.label }]}
                                    defaultValue={{ value: "", label: "" }}
                                    name="tipoParamentro"
                                    placeholder="Selecione o tipo correspondente do parâmetro."
                                    onChange={(e: any) => { handleChangeSelectTipo(e) }}
                                    onCreateOption={(e: any) => { createTipoOption(e); }}
                                    options={tipos}
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
                                    onCreateOption={(e: any) => { createMedidaOption(e); }}
                                    options={unidadeMedidas}
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
                                    default={parametro?.fator}
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
                                    default={parametro?.offset}
                                />
                            </Col>
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
        </>
    )
}