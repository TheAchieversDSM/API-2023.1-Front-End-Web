import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../modal';
import axios from 'axios';

interface IUser {
    user_id: number;
    nome?: string;
    email?: string;
  }

export default function TableUsu() {
    const [users, setUsers] = useState<IUser[]>([])
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = React.useState<IUser>();

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/user/pegarUsuarios").then((res)=>{
                setUsers(res.data)
            })
        }
        render()
    }, [])

    const handleShowModal = (user: IUser) => {
        setModalData(user);
        setModalShow(true);
      };

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
                            <td>{user.user_id}</td>
                            <td>{user?.nome}</td>
                            <td>{user?.email}</td>
                            <td>            
                                <Button className="bt bt-view"><BsEye className="icon" onClick={() => handleShowModal(user)}/></Button>
                                <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                                <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                            </td>
                        </tr>
                    </>)}
                    <MyVerticallyCenteredModal
                                    show={modalShow}
                                    {...modalData}
                                    onHide={() => setModalShow(false)}
                                    titulo={modalData?.nome}
                                    coluna1="ID: " resp1={modalData?.user_id}
                                    coluna2="Email: " resp2={modalData?.email}
                                />
            </tbody>
        </Table>
    </div>
  )
}