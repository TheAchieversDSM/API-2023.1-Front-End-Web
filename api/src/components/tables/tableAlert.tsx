import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil, BsClipboard2 } from 'react-icons/bs'
import React from 'react';

export default function TableAlert() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Estação</th>
                    <th>Parâmetro</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>935457</td>
                    <td>Station</td>
                    <td>Velocidade do vento</td>
                    <td>30 km/h</td>
                    <td>      
                        <Button className="bt bt-record"><BsClipboard2 className="icon"/></Button>      
                        <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                        
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            titulo="935457"
                            coluna1="ID: " resp1="935457"
                            coluna2="Estação: " resp2="Station"
                            coluna3="Parâmetro: " resp3="Velocidade do vento"
                            coluna4="Valor: " resp4="30 km/h"
                            coluna5="Mensagem: " resp5="Mensagem"
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}