import React from 'react';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import Button from '../components/button'

import '../styles/criar-usuarios.css'
import { Col, Row } from 'react-bootstrap';

export default function CriarUsuarios() {
    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1>Cadastro de Usuários</h1>
                
                <div className="box-create-user">
                    <Row className="create-alert-content">
                        <Col md={6}>
                            <Input
                                label="Nome"
                                size="mb-6"
                                type="text"
                                placeholder="Insira o nome do usuário."
                            />
                        </Col>

                        <Col md={5}>
                            <Input
                                label="E-mail"
                                size="mb-6"
                                type="email"
                                placeholder="Insira o e-mail do usuário."
                            />
                        </Col>
                    </Row>
                    
                    <Row className="create-alert-content">
                        <Col md={11}>
                            <SelectMulti
                                label="Nível de Acesso"
                                size="mb-3"
                                name="nivel-user"
                                placeholder="Selecione o nível de acesso do usuário."
                                options={[]}
                                onChange={null}
                                close={true}
                            />
                        </Col>
                    </Row>

                    <Row className="create-alert-content">
                        <Col md={11}>
                            <Input
                                label="Senha"
                                size="mb-6"
                                type="password"
                                placeholder="Insira a primeira senha de acesso do usuário."
                            />
                        </Col>
                    </Row>

                    <div className="create-alert-button">
                        <Button label="Criar!"/>
                    </div>
                </div>
            </div>
        </>
    )
}