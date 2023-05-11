import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsXOctagon, BsCheckLg, BsPencil, BsClipboard2 } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../search';
import { Tab, Tabs } from 'react-bootstrap';
import { AuthContext } from "../../hooks/useAuth";
import { parseCookies } from "nookies";
import Swal from 'sweetalert2'

interface IAlerta {
	alerta_id: number;
	nome?: string;
	valorMax?: number;
	valorMinimo?: string;
	nivel?: number;
	ativo?: number;
	parametro?: {
		parametro_id: number;
		nome?: string;
	}
}

export default function TableAlert() {
	const [alertas, setAlertas] = useState<IAlerta[]>([]);
	const [inativos, setInativos] = useState<IAlerta[]>([])
	const [searchTerm, setSearchTerm] = useState('');
	const cookies = parseCookies();

	useEffect(() => {
		function render() {
			axios
				.get("http://localhost:5000/alerta/pegarAlertasAtivos", {
					headers: {
						Authorization: `Bearer ${cookies["tecsus.token"]}`,
					},
				})
				.then((res) => {
					setAlertas(res.data);
				});
		}
		render();
	}, []);

	useEffect(() => {
		function render() {
			axios
				.get("http://localhost:5000/alerta/pegarAlertasInativos", {
					headers: {
						Authorization: `Bearer ${cookies["tecsus.token"]}`,
					},
				})
				.then((res) => {
					setInativos(res.data);
				});
		}
		render();
	}, []);

	function handleChange(alertas: IAlerta) {
		const id = alertas.alerta_id;
		const ativo = alertas.ativo === 1 ? 0 : 1;

		Swal.fire({
			title: 'Alterar status do alerta?',
			text: `Deseja alterar o status do alerta ${alertas.nome}?`,
            icon: 'warning',
			showDenyButton: true,
			confirmButtonText: 'Alterar!',
			denyButtonText: `Não alterar`,
		}).then((result: any) => {
			if (result.isConfirmed) {
				Swal.fire('Atualizado!', '', 'success')

				axios.put(`http://localhost:5000/alerta/atualizarEstado/${id}`,{ ativo },
				{ headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
				)
				.then((response) => {
					// fazer algo com a resposta, se necessário
					window.location.reload();
				})
				.catch((error) => {
					// tratar o erro, se necessário
					console.error(error);
				});
			}
		})
	}
	
	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function renderTableRows() {
		return alertas
			.filter((alerta) => {
				if (!searchTerm) {
					return true;
				}

				if (
					alerta?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					alerta.alerta_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
				) {
					return true;
				}

				return false;
			})
			.map((alerta) => (
				<tr>
					<td>{alerta.alerta_id}</td>
					<td>{alerta.nome}</td>
					<td>{alerta.nivel}</td>
					<td>{alerta.valorMax}</td>
					<td>{alerta.valorMinimo}</td>
					<td>{alerta.parametro?.nome}</td>
					<td>
					
						<Link to={`/editar-alerta/${alerta.alerta_id}`}>
							<Button className="bt bt-edit">
								<BsPencil className="icon" />
							</Button>
						</Link>
						<Button className="bt bt-delete" onClick={() => handleChange(alerta)}><BsXOctagon className="icon" /></Button>

					</td>
				</tr>
			));
	}

	function renderTableRowsInativos() {
		return inativos
			.filter((inativo) => {
				if (!searchTerm) {
					return true;
				}

				if (
					inativo?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					inativo.alerta_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
				) {
					return true;
				}

				return false;
			})
			.map((inativo) => (
				<tr>
					<td>{inativo.alerta_id}</td>
					<td>{inativo.nome}</td>
					<td>{inativo.nivel}</td>
					<td>{inativo.valorMax}</td>
					<td>{inativo.valorMinimo}</td>
					<td>{inativo.parametro?.nome}</td>
					<td>
						<Link to={`/editar-alerta/${inativo.alerta_id}`}>
							<Button className="bt bt-edit">
								<BsPencil className="icon" />
							</Button>
						</Link>
						<Button className="bt bt-active" onClick={() => handleChange(inativo)}><BsCheckLg className="icon" /></Button>

					</td>
				</tr>
			));
	}

	return (
		<>
			<Search change={handleSearch} link="/criar-alertas" />
			<div className="box-list">
				<Tabs defaultActiveKey="ativo">
					<Tab eventKey="ativo" title="Ativos">
						<Table className="table" size="sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>Nível</th>
									<th>Valor Máximo</th>
									<th>Valor Minimo</th>
									<th>Parâmetro vinculado</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{renderTableRows()}
							</tbody>
						</Table>
					</Tab>
					<Tab eventKey="inativo" title="Inativos">
						<Table className="table" size="sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>Nível</th>
									<th>Valor Máximo</th>
									<th>Valor Minimo</th>
									<th>Parâmetro vinculado</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{renderTableRowsInativos()}
							</tbody>
						</Table>
					</Tab>
				</Tabs>
			</div>
		</>
	)
}