import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsSearch } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../modal';
import axios from 'axios';
import Search from '../search';
import { Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { parseCookies } from "nookies";
import Swal from 'sweetalert2'

import '../../styles/modal.css';
import url from '../../services/config';
interface IUser {
	user_id: number;
	nome?: string;
	email?: string;
	tipoUsuario: number;
}

export default function TableUsu() {
	const [users, setUsers] = useState<IUser[]>([])
	const [modalShow, setModalShow] = React.useState(false);
	const [modalData, setModalData] = React.useState<IUser>();
	const [searchTerm, setSearchTerm] = useState('');
	const [nivelUser, setNivelUser] = useState("");

	const cookies = parseCookies();

	const handleShowModal = (usuario: any) => {
		setModalData(usuario);
		setModalShow(true);
	};

	useEffect(() => {
		function render() {
			axios
				.get(`${url.baseURL}/user/pegarUsuarios`, {
					headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
				})
				.then((res) => {
					setUsers(res.data);
				});
		}
		render();
	
		axios
        .get(`${url.baseURL}/user/pegarUsuarios`, {
          headers: {
            Authorization: `Bearer ${cookies["tecsus.token"]}`,
          },
        })
        .then((re) => {
          re.data.map((user: any) => {
            if (user.user_id == cookies["tecsus.user_id"]) {			
              setNivelUser(user.tipoUsuario);
			  console.log(nivelUser);
            }
          });
        });
	
	}, []);

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function handleDelete(id: number) {
		Swal.fire({
			title: 'Deletar usuário?',
			text: `Deseja deletar o usuário?`,
			icon: 'warning',
			showDenyButton: true,
			confirmButtonText: 'Deletar!',
			denyButtonText: `Não deletar`,
		}).then((result: any) => {
			if (result.isConfirmed) {
				Swal.fire('Deletado!', '', 'success')

				axios.delete(`${url.baseURL}/user/deletarUsuario`, {
					data: { id },
					headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
				}).then(() => {
					// Atualiza a lista de usuários após a exclusão
					axios.get(`${url.baseURL}/user/pegarUsuarios`, {
						headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
					}).then((res) => {
						setUsers(res.data);
						console.log("Usuário deletado com sucesso");
					});
				}).catch((error) => {
					console.error(error);
				});
			}
		})


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
					<td>{user.tipoUsuario}</td>
					<td>

					{Number(cookies["tecsus.nivel"]) === 1 ? (
						<>
						<OverlayTrigger
							placement="top"
							delay={{ show: 150, hide: 200 }}
							overlay={editTooltip}
						>
							<Link to={`/editar-usuario/${user.user_id}`}>
								<Button className="bt bt-edit">
									<BsPencil className="icon" />
								</Button>
							</Link>
						</OverlayTrigger>

						<OverlayTrigger
							placement="top"
							delay={{ show: 150, hide: 200 }}
							overlay={deleteTooltip}
						>
							<Button className="bt bt-delete" onClick={() => handleDelete(user.user_id)}>
								<BsTrash3 className="icon" />
							</Button>
						</OverlayTrigger>
              			</>
					):null}
					</td>
				</tr>
			));
	}

	const editTooltip = (props:any) => (
		<Tooltip id="button-tooltip" {...props}>
		  Editar
		</Tooltip>
	);
  	const deleteTooltip = (props:any) => (
		<Tooltip id="button-tooltip" {...props}>
		  Deletar
		</Tooltip>
	);

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
							<th>Nível</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{renderTableRows()}
					</tbody>
				</Table>
			</div>
		</>
	)
}