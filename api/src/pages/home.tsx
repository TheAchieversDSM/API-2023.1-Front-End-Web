import React from 'react';
import Sidebar from '../components/sidebar';
import "../styles/home.css"
import { BsSearch, BsHouse, BsSignpostSplit, BsPerson, BsExclamationTriangle, BsClipboard2Check, BsBarChart, BsBoxArrowInLeft } from 'react-icons/bs'

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { parseCookies } from "nookies";

export default function HOME() {
    const navigate = useNavigate();
    const cookies = parseCookies();

    return (
        <>
            <Sidebar />
            <h1 className="tituloHome">Bem-vindo à Tecsus!</h1>

            <div className="row pack">
                {cookies["tecsus.token"] ? (
                    <>
                        <div className="boxRotas col-3">
                            <button
                                className="btn-rotas"
                                onClick={() => navigate("/parametros")}
                            >
                                <BsClipboard2Check className="icon" />
                                <p>Parâmetros</p>
                            </button>
                        </div>
                        <div className="boxRotas col-3">
                            <button
                                className="btn-rotas"
                                onClick={() => navigate("/alertas")}
                            >
                                <BsExclamationTriangle className="icon" />
                                <p>Alertas</p>
                            </button>
                        </div>
                    </>
                ) : null}

                <div className="boxRotas col-3">
                    <Link to="/estacoes">
                        <button className="btn-rotas">
                            <BsSignpostSplit className="icon" />
                            <p>Estações</p>
                        </button>
                    </Link>
                </div>

                {cookies["tecsus.token"] ? (
                    <div className="boxRotas col-3">
                        <Link to="/usuarios">
                            <button className="btn-rotas">
                                <BsPerson className="icon" />
                                <p>Usuários</p>
                            </button>
                        </Link>
                    </div>
                ) : null}
        </div >
        </>
    )
}