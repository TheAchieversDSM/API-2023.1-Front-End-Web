import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsSearch } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../modal';
import axios from 'axios';
import Search from '../search';
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalForm from '../modalForm';

import '../../styles/modal.css';
interface IUser {
    user_id: number;
    nome?: string;
    email?: string;
}

export default function TableUsu() {
    const [users, setUsers] = useState<IUser[]>([])
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = React.useState<IUser>();
    const [searchTerm, setSearchTerm] = useState('');

    const handleShowModal = (parametro: any) => {
        console.log(parametro);
        
        setModalData(parametro);
        setModalShow(true);
    };

    useEffect(() => {
        function render() {
            axios.get("http://localhost:5000/user/pegarUsuarios").then((res) => {
                setUsers(res.data)
            })
        }
        render()
    }, [])

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function renderTableRows() {
        return users
            .filter((user) => {
                if (!searchTerm) {
                    return true;
                }

                if (
                    user?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.user_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return true;
                }

                return false;
            })
            .map((user) => (
                <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button className="bt bt-edit" onClick={() => handleShowModal(user)}>
                            <BsPencil className="icon" />
                        </Button>
                        <Button className="bt bt-delete">
                            <BsTrash3 className="icon" />
                        </Button>
                    </td>
                </tr>
            ));
    }

    return (
        <>
            <Search change={handleSearch} link="/criar-usuarios" />
            <div className="box-list">
                <Table className="table" size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </Table>
                <ModalForm
                    show={modalShow}
                    {...modalData}
                    onHide={() => setModalShow(false)}
                    titulo={"Editar Usuário: " + modalData?.nome}
                    campo1={"Nome"}
                    tipo1={"text"}
                    value1={modalData?.nome}
                    placeholder1={"Digite o novo nome do usuário"}
                    campo2={"Email"}
                    tipo2={"email"}
                    value2={modalData?.email}
                    placeholder2={"Digite o novo email do usuário"}
                    function={() => setModalShow(false)}
                />
            </div>
        </>
    )
}