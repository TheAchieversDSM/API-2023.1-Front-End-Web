import React from 'react';
import Sidebar from '../components/sidebar';
import "../styles/home.css"
import { BsSearch, BsHouse, BsSignpostSplit, BsPerson, BsExclamationTriangle, BsClipboard2Check, BsBarChart, BsBoxArrowInLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function HOME() {
    return (
        <>
            <Sidebar/>
                <h1 className="titulo">Bem-vindo à Tecsus!</h1>
            <div className="row pack">
                
                <div className="box col-3">
                    <Link to="/estacoes">
                        <button className="boxbtn">
                            <BsSignpostSplit className="icon" />
                            <p>Estações</p>
                        </button>
                    </Link>
                </div>
                <div className="box col-3">
                    <Link to="/parametros">
                        <button className="boxbtn">
                        <BsClipboard2Check className="icon" />
                            <p>Parâmetros</p>
                        </button>
                    </Link>
                </div>
                <div className="box col-3">
                    <Link to="/alertas">
                        <button className="boxbtn">
                            <BsExclamationTriangle className="icon" />
                            <p>Alertas</p>
                        </button>
                    </Link>
                </div>
                <div className="box col-3">
                    <Link to="/usuarios">
                        <button className="boxbtn">
                            <BsPerson className="icon" />
                            <p>Usuários</p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}