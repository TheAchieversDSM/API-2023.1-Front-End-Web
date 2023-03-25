import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsGraphUp } from 'react-icons/bs'
import MyVerticallyCenteredModal from '../modal';
import React from 'react';
import { Link } from 'react-router-dom';

export default function TableEst() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>6583</td>
                    <td>Station</td>
                    <td>-28.1845</td>
                    <td>32.9533</td>
                    <td>
                        <Link to="/dashboard/:id"><Button className="bt bt-dash"><BsGraphUp className="icon"/></Button></Link>
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
            </tbody>
        </Table>
    </div>
  )
}