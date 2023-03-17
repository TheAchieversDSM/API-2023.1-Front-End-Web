import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import React from 'react';

export default function TablePar(props:any) {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Unidade de medida</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>200</td>
                    <td>Pluviômetro</td>
                    <td>pluviometro</td>
                    <td>mm</td>
                    <td>            
                        <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            titulo="200"
                            coluna1="ID: " resp1="200"
                            coluna2="Nome: " resp2="Pluviômetro"
                            coluna3="Tipo: " resp3="Pluviômetro"
                            coluna4="Unidade de medida: " resp4="mm"
                            coluna5="Fator: " resp5="não sei"
                            coluna6="OffSet: " resp6="não sei também"
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}