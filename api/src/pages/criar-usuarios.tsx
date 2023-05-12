import React, { useState } from 'react';
import axios from 'axios';

// components ✨
import { Col, Row, Form } from 'react-bootstrap';
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'
import Swal from 'sweetalert2'

import { parseCookies } from "nookies";

import '../styles/criar-usuarios.css'

const { Select } = Form;

const options = [{ value: '1', label: 'Administrador' }, { value: '2', label: 'Comum' }]

export default function CriarUsuarios() {
    const cookies = parseCookies();

    const tipoUsuario = { value: '', label: '' }

    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        tipoUsuario: tipoUsuario,
        senha: '',
    })

    // inputs' handleChange ✨
    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setUsuario((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    // select's handleChange ✨
    const handleChangeSelect = (event: any) => {
        if (event.length != 0 && event) {
            setUsuario((prevState) => {
                return {
                    ...prevState,
                    tipoUsuario: event.target.value,
                };
            });
        }
    };

    const handleSubmit = (event: any) => {
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        event.preventDefault()
        console.log( {
            // colocar o campo de tipo aqui
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuario: usuario.tipoUsuario
        })
        axios.post(`http://localhost:5000/user/cadastro`, {
            // colocar o campo de tipo aqui
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuario: usuario.tipoUsuario
        },
             { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } } 
        ).then((res) => {

        })

        Swal.fire({
            title: 'Usuário cadastrado!',
            text: `O usuário ${usuario.nome} foi cadastrado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Sidebar />

                <div className="main-body">
                    <h1 className="TitImp">Cadastro de Usuários</h1>

                    <div className="box-create-user">

                        <Row className="create-alert-content">
                            <Col md={6}>
                                <Input
                                    label="Nome"
                                    name="nome"
                                    size="mb-6"
                                    type="text"
                                    placeholder="Insira o nome do usuário."
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col md={5}>
                                <Input
                                    label="E-mail"
                                    name="email"
                                    size="mb-6"
                                    type="email"
                                    placeholder="Insira o e-mail do usuário."
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="create-alert-content">
                            <Col md={11}>
                                {/*<SelectMulti
                                    label="Nível de Acesso"
                                    size="mb-3"
                                    name="tipoUsuario"
                                    placeholder="Selecione o nível de acesso do usuário."
                                    options={options}
                                    onChange={handleChangeSelect}
                                    close={true}
                                />*/}

                                <Form.Label>Selecione o nível de acesso do usuário</Form.Label>
                                <Select onChange={handleChangeSelect}>
                                    {options.map((option)=> (
                                        <option key={option?.value} value={option?.value}>
                                        {option?.label}
                                    </option>
                                    ))}
                                </Select>
                            </Col>
                        </Row> 

                        <Row className="create-alert-content">
                            <Col md={11}>
                                <Input
                                    label="Senha"
                                    name="senha"
                                    size="mb-6"
                                    type="password"
                                    placeholder="Insira a primeira senha de acesso do usuário."
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <div className="create-alert-button">
                            <Button
                                type=""
                                label="Criar!"
                                className="btnCriar"
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}