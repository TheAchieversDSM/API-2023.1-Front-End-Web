import React from 'react'

import { Link } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import { Row, Col } from 'react-bootstrap';

import logo from '../images/logo-3.png';
import '../styles/login.css'

export default function Login() {
    return (
        <div className="body-login">
            <div className="grid-login">
                <img src={logo} alt="logo" />

                <div className="box-glass">
                    <Row className='login-fields'>
                        <Col md={10}>
                            <Input
                                label="E-mail"
                                size="mb-6"
                                type="email"
                                placeholder="Insira seu e-mail."
                                onChange={""}
                            />

                            <Input
                                label="Senha"
                                size="mb-6"
                                type="passoword"
                                placeholder="Insira sua senha."
                                onChange={""}
                            />

                            <div className="login-button">
                                <Link to="/home">
                                    <Button type="submit" label="Log In" onClick={''} />
                                </Link>
                            </div>

                            <hr></hr>

                            <Link to="/home" className="acesso-livre">
                                <p>Ou acesse sem logar!</p>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}