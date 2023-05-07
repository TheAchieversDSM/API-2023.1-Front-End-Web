import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// styles & images ✨
import '../styles/sidebar.css';
import logo from '../images/logo-3.png';

// components & icons ✨
import { BsSearch, BsHouse, BsSignpostSplit, BsPerson, BsExclamationTriangle, BsClipboard2Check, BsBarChart, BsBoxArrowInLeft, BsBoxArrowRight } from 'react-icons/bs'
import { AuthContext } from "../hooks/useAuth";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { parseCookies } from "nookies";

export default function Sidebar() {
    const { signOut } = useContext(AuthContext);
    const cookies = parseCookies();

    return (
        <>
            <nav className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} alt="logo" />
                        </span>
                    </div>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link to="/home">
                                    <BsHouse className="icon" />
                                    <span className="text nav-text">Início</span>
                                </Link>
                            </li>

                            {cookies["tecsus.token"] ? (
                                <li className="nav-link">
                                    <Link to="/parametros">
                                        <BsClipboard2Check className="icon" />
                                        <span className="text nav-text">Parâmetros</span>
                                    </Link>
                                </li>
                            ) : null}

                            {cookies["tecsus.token"] ? (
                                <li className="nav-link">
                                    <Link to="/alertas">
                                        <BsExclamationTriangle className="icon" />
                                        <span className="text nav-text">Alertas</span>
                                    </Link>
                                </li>
                            ) : null}

                            <li className="nav-link">
                                <Link to="/estacoes">
                                    <BsSignpostSplit className="icon" />
                                    <span className="text nav-text">Estações</span>
                                </Link>
                            </li>

                            {cookies["tecsus.token"] ? (
                                <li className="nav-link">
                                    <Link to="/usuarios">
                                        <BsPerson className="icon" />
                                        <span className="text nav-text">Usuários</span>
                                    </Link>
                                </li>
                            ) : null}

                            <li className="nav-link">
                                <Dropdown className="dropdown-sidebar">
                                    <Dropdown.Toggle className="drop-sidebar">
                                        <BsHouse className="icon drop-icon" />
                                        <span className="text nav-text">Documentação</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/doc-parametro">Sensores e Parâmetro</Dropdown.Item>
                                        <Dropdown.Item href="/doc-alerta">Alerta</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        {cookies["tecsus.token"] ? (
                            <li>
                                <Button onClick={signOut}>
                                    <BsBoxArrowRight className="icon" />
                                    <span className="text nav-text">Logout</span>
                                </Button>
                            </li>
                        ) : (
                            <li>
                                <a href="/">
                                    <BsBoxArrowInLeft className="icon" />
                                    <span className="text nav-text">Entrar</span>
                                </a>
                            </li>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

