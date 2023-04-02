import React, { useState } from 'react';
import axios from 'axios';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'

import '../styles/criar-usuarios.css'
import { Col, Row, Form } from 'react-bootstrap';

const options = [ {value: '1', label: 'Administrador'}, {value: '2', label: 'Comum'} ]

export default function CriarUsuarios() {

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
                    tipoUsuario: event[0].value,
                };
            });               
        }  
    };

    const handleSubmit = (event: any) => { 
        for (let index = 0; index < event.target.querySelectorAll("input").length; index++) {
            event.target.querySelectorAll("input")[index].value = ""
        }

        axios.post(`http://localhost:5000/user/cadastro`, {
            // colocar o campo de tipo aqui
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        }).then((res) => {

        })

        alert('Usuário cadastrado!');   
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
                
                        {/* <Row className="create-alert-content">
                            <Col md={11}>
                                <SelectMulti
                                    label="Nível de Acesso"
                                    size="mb-3"
                                    name="tipoUsuario"
                                    placeholder="Selecione o nível de acesso do usuário."
                                    options={options}
                                    onChange={handleChangeSelect}
                                    close={true}
                                />
                            </Col>
                        </Row> */}

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
    )
}