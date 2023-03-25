import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil, BsClipboard2 } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

let modelo = [
    {
        'id': '',
        'nome':'',
        'id_estacao': '',
        'id_parametro': '',
        'valorMax': '',
        'valorMinimo': ''
    }
]

export default function TableAlert() {
    const [alertas, setAlertas] = useState(modelo)
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() =>{
        function render(){
            axios.get("http://localhost:5000/alerta/pegarAlertas").then((res) =>{
                setAlertas(res.data)
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
                    <th>Estação</th>
                    <th>Parâmetro</th>
                    <th>Valor Máximo</th>
                    <th>Valor Minimo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {alertas.map(alerta =>
                    <tr>
                    <td>{alerta.id}</td>
                    <td>{alerta.id_estacao}</td>
                    <td>{alerta.id_parametro}</td>
                    <td>{alerta.valorMax}</td>
                    <td>{alerta.valorMinimo}</td>
                    <td>      
                        <Button className="bt bt-record"><BsClipboard2 className="icon"/></Button>      
                        <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                        
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            titulo={alerta.id}
                            coluna1="ID: " resp1={alerta.id}
                            coluna2="Estação: " resp2={alerta.id_estacao}
                            coluna3="Parâmetro: " resp3={alerta.id_parametro}
                            coluna4="Valor Máximo: " resp4={alerta.valorMax}
                            coluna5="Valor Minimo: " resp5={alerta.valorMinimo}
                        />
                    </td>
                </tr>)}
            </tbody>
        </Table>
    </div>
  )
}