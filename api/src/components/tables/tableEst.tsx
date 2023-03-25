import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsGraphUp } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyVerticallyCenteredModal from '../modal';
import React from 'react';
import { Link } from 'react-router-dom';

let modelo = [
    {
        'id': '',
        'nome': '',
        'lati': '',
        'long': '',
        'unixtime': ''
    }
]

export default function TableEst() {
    const [estacoes, setEstacoes] = useState(modelo)

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/estacao/pegarEstacoes").then((res)=>{
                setEstacoes(res.data)
            })
        }
        render()
    },[])
    
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>UnixTime</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {estacoes.map(estacao =>
                    <tr>
                        <td>{estacao.id}</td>
                        <td>{estacao.nome}</td>
                        <td>{estacao.lati}</td>
                        <td>{estacao.long}</td>
                        <td>{estacao.unixtime}</td>
                        <td>
                            <Button className="bt bt-view"><BsEye className="icon"/></Button>
                            <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                            <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                            <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                            <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            titulo="Station"
                            coluna1="ID: " resp1="6583"
                            coluna2="Latitude: " resp2="-28.1845"
                            coluna3="Longitude: " resp3="32.9533"
                            coluna4="UID: " resp4=""
                            coluna5="UTC: " resp5=""
                            coluna6="Parâmetros: " resp6=""
                        />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}