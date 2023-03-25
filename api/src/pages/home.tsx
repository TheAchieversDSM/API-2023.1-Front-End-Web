import React from 'react';
import Sidebar from '../components/sidebar';
import "../styles/home.css"
import { BsSearch, BsHouse, BsSignpostSplit, BsPerson, BsExclamationTriangle, BsClipboard2Check, BsBarChart, BsBoxArrowInLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function HOME() {
    return (
        <>
            <Sidebar/>
            <h1 className="tituloHome">Bem-vindo à Tecsus!</h1>
            <div className="row pack">
                <div className="boxRotas col-3">
                    <Link to="/estacoes">
                        <button className="btn-rotas">
                            <BsSignpostSplit className="icon" />
                            <p>Estações</p>
                        </button>
                    </Link>
                </div>
                <div className="boxRotas col-3">
                    <Link to="/parametros">
                        <button className="btn-rotas">
                            <BsClipboard2Check className="icon" />
                            <p>Parâmetros</p>
                        </button>
                    </Link>
                </div>
                <div className="boxRotas col-3">
                    <Link to="/alertas">
                        <button className="btn-rotas">
                            <BsExclamationTriangle className="icon" />
                            <p>Alertas</p>
                        </button>
                    </Link>
                </div>
                <div className="boxRotas col-3">
                    <Link to="/usuarios">
                        <button className="btn-rotas">
                            <BsPerson className="icon" />
                            <p>Usuários</p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}