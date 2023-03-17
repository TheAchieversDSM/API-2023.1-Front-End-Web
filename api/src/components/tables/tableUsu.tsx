import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import React from 'react';
import MyVerticallyCenteredModal from '../modal';

export default function TableUsu() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="box-list">
        <Table className="table"  size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Nível</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10294</td>
                    <td>Fulano de Tal</td>
                    <td>fulano_tal@email.com</td>
                    <td>Administrador</td>
                    <td>            
                        <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            titulo="Fulano de Tal"
                            coluna1="ID: " resp1="10294"
                            coluna2="Nome: " resp2="Fulano de Tal"
                            coluna3="Email: " resp3="fulano_tal@email.com"
                            coluna4="Nível: " resp4="Administrador"
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}