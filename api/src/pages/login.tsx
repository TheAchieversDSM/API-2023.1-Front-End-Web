import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { Row, Col, Form } from "react-bootstrap";
import { useContext } from "react";
import logo from "../images/logo-3.png";
import "../styles/login.css";
import axios from "axios";

import { AuthContext } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { signIn, isAuthenticated } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event: any) => {
        for (
            let index = 0;
            index < event.target.querySelectorAll("input").length;
            index++
        ) {
            event.target.querySelectorAll("input")[index].value = "";
        }

        console.log(values);
        event.preventDefault();

        try {
            await signIn({ email: values.email, password: values.password });
        } catch {
            console.log("erro");
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className="body-login">
            <div className="grid-login">
                <img src={logo} alt="logo" />

                <div className="box-glass">
                    <Form onSubmit={handleSubmit}>
                        <Row className="login-fields">
                            <Col md={10}>
                                <Input
                                    label="E-mail"
                                    size="mb-6"
                                    type="email"
                                    name="email"
                                    placeholder="Insira seu e-mail."
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Senha"
                                    size="mb-6"
                                    type="password"
                                    name="password"
                                    placeholder="Insira sua senha."
                                    onChange={handleChange}
                                />

                                <div className="login-button">
                                    <Button type="submit" label="Log In" />
                                </div>

                                <hr></hr>

                                <Link to="/home" className="acesso-livre">
                                    <p>Ou acesse sem logar!</p>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}