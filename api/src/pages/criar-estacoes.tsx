import React, { useEffect, useState } from 'react';
import axios from 'axios';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'

import '../styles/criar-estacoes.css'
import { Col, Row } from 'react-bootstrap';

const modelo = [{ value: '', label: '' }]

export default function CriarEstacoes() {

    const parametro = [{ value: '', label: '' }]
    const [parametros, setParametros] = useState(modelo)

    const [estacao, setEstacao] = useState({
        nome: '',
        latitude: '',
        longitude: '',
        parametro: parametro,
        uid: '',
        utc: ''
    })

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

    // select's handleChange ✨
    const handleChangeSelect = (event: any) => {
        var parameters = []

        if (event.length != 0 && event) {

            for (let i = 0; i < event.length; i++) {
                let option = { value: event[i].value, label: event[i].label }
                
                parameters.push(option)
            }

            estacao.parametro = parameters

            setEstacao(estacao)
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post(`http://localhost:5000/estacao/cadastro`, {
            nome_estacao: estacao.nome,
            latitude: estacao.latitude,
            longitude: estacao.longitude,
            uid: estacao.uid,
            utc: estacao.utc,
            parametros: estacao.parametro
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
        })

        alert('Estação cadastrada!');

        setEstacao({
            nome: "",
            latitude: "",
            longitude: "",
            uid: "",
            utc: "",
            parametro: parametro
        })
    };

    // get unidade de medidas & tipos de parâmetros ✨
    useEffect(() => {
        async function render() {
            axios.get(`http://localhost:5000/parametro/pegarParametros`).then((res) => {
                const parametro = [{ value: '', label: '' }]

                for (let index = 0; index <= res.data.length - 1; index++) {
                    let option = {
                        value: res.data[index].parametro_id,
                        label: res.data[index].nome
                    }

                    parametro.push(option)
                }

                setParametros(parametro)
            });
        }

        render()
    }, [])

    return (
        <>
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
                                onChange={(e: any) => { handleChangeSelect(e) }}
                                close={false}
                            />
                        </Col>
                    </Row>

                    <div className="create-station-button">
                        <Button type="submit" label="Criar!" className="btnCriar" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}