import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import { BsTrash3, BsEye, BsPencil, BsSearch } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "../modal";
import axios from "axios";
import Search from "../search";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { parseCookies } from "nookies";
import "../../styles/modal.css";
interface IUser {
  user_id: number;
  nome?: string;
  email?: string;
}

export default function TableUsu() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState<IUser>();
  const [searchTerm, setSearchTerm] = useState("");
  const cookies = parseCookies();
  const handleShowModal = (usuario: any) => {
    setModalData(usuario);
    setModalShow(true);
  };

  useEffect(() => {
    function render() {
      axios
        .get("http://localhost:5000/user/pegarUsuarios", {
          headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
    render();
  }, []);

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
          user.user_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
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
            <Link to={`/editar-usuario/${user.user_id}`}>
              <Button className="bt bt-edit">
                <BsPencil className="icon" />
              </Button>
            </Link>
            <Button
              className="bt bt-delete"
              onClick={() => handleDelete(user.user_id)}
            >
              <BsTrash3 className="icon" />
            </Button>
          </td>
        </tr>
      ));
  }

  function handleDelete(id: number) {
    axios
      .delete(`http://localhost:5000/user/deletarUsuario`, {
        data: { id },
        headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
      })
      .then(() => {
        // Atualiza a lista de usuários após a exclusão
        axios
          .get("http://localhost:5000/user/pegarUsuarios", {
            headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
          })
          .then((res) => {
            setUsers(res.data);
            console.log("Usuário deletado com sucesso");
          });
      })
      .catch((error) => {
        console.error(error);
      });
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
          <tbody>{renderTableRows()}</tbody>
        </Table>
      </div>
    </>
  );
}
