import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../modal';
import axios from 'axios';

let modelo = [
    {
        'id': '',
        'nome': '',
        'email': ''
    }
]

export default function TableUsu() {
    const [users, setUsers] = useState(modelo)
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/user/pegarUsuarios").then((res)=>{
                setUsers(res.data)
            })
        }
        render()
    }, [])

  return (
    <div className="box-list">
        <Table className="table"  size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>            
                                <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                                <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                                <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    titulo={user.nome}
                                    coluna1="ID: " resp1={user.id}
                                    coluna2="Email: " resp2={user.email}
                                />
                            </td>
                        </tr>
                    </>)}
            </tbody>
        </Table>
    </div>
  )
}