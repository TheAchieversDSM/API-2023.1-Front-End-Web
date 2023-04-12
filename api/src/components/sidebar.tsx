import React from 'react'
import { Link } from 'react-router-dom'

// styles & images ✨
import '../styles/sidebar.css';
import logo from '../images/logo-3.png';

// components & icons ✨
import { BsSearch, BsHouse, BsSignpostSplit, BsPerson, BsExclamationTriangle, BsClipboard2Check, BsBarChart, BsBoxArrowInLeft } from 'react-icons/bs'

export default function Sidebar() {
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

                            <li className="nav-link">
                                <Link to="/parametros">
                                    <BsClipboard2Check className="icon" />
                                    <span className="text nav-text">Parâmetros</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to="/alertas">
                                    <BsExclamationTriangle className="icon" />
                                    <span className="text nav-text">Alertas</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to="/estacoes">
                                    <BsSignpostSplit className="icon" />
                                    <span className="text nav-text">Estações</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to="/usuarios">
                                    <BsPerson className="icon" />
                                    <span className="text nav-text">Usuários</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li>
                            <a href="/">
                                <BsBoxArrowInLeft className="icon" />
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>

                </div>
            </nav>
        </>
    );
}

