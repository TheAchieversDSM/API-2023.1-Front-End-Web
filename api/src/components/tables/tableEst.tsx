import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsGraphUp, BsClipboard2 } from 'react-icons/bs'
import { FaChartLine } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyVerticallyCenteredModal from '../modal';
import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search';
interface IEstacao {
  estacao_parametro: any;
  id: any;
  estacao_id: number;
  nome: string;
  uid: string;
  UTC: string;
  lati: number;
  long: number;
  unixtime: number;
  parametros?: {
    parametro_id: number;
    nome: string;
    formula: string;
    fator: string;
    offset: string;
    tipo?: {
      tipo_id: number;
      nome: string;
    };
    unidadeDeMedida?: {
      unidade_id: number;
      nome: string;
    };
  }[];
}

export default function TableEst() {
  const [estacoes, setEstacoes] = useState<IEstacao[]>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState<IEstacao>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = (estacao: IEstacao) => {
    setModalData(estacao);
    setModalShow(true);
  };

  useEffect(() => {
    function render() {
      axios.get("http://localhost:5000/estacao/pegarEstacoes").then((res) => {
        setEstacoes(res.data)
      })
    }
    render()
  }, [])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function renderTableRows() {
    return estacoes
      .filter((estacao) => {
        if (!searchTerm) {
          return true;
        }

        if (
          estacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          estacao.estacao_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }

        return false;
      })
      .map((estacao) => (
        <tr>
          <td>{estacao.estacao_id}</td>
          <td>{estacao.nome}</td>
          <td>{estacao.lati}</td>
          <td>{estacao.long}</td>
          <td>
            <Link to={`/dashboard/${estacao.estacao_id}`}>
              <Button className="bt bt-record"><FaChartLine className="icon" />
              </Button>
            </Link>

            <Button className="bt bt-view" onClick={() => handleShowModal(estacao)}>
              <BsEye className="icon" />
            </Button>

            <Link to={`/editar-estacao/${estacao.estacao_id}`}>
              <Button className="bt bt-edit">
                <BsPencil className="icon" />
              </Button>
            </Link>

            <Button className="bt bt-delete">
              <BsTrash3 className="icon" />
            </Button>
          </td>
        </tr>
      ));
  }

  return (
    <>
      <Search change={handleSearch} link="/criar-estacoes" />
      <div className="box-list">
        <Table className="table" size="sm">
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
            {renderTableRows()}
            <MyVerticallyCenteredModal
              show={modalShow}
              {...modalData}
              onHide={() => setModalShow(false)}
              titulo={modalData?.nome}
              coluna1="ID: " resp1={modalData?.estacao_id}
              coluna2="Latitude: " resp2={modalData?.lati}
              coluna3="Longitude: " resp3={modalData?.long}
              coluna4="UID: " resp4={modalData?.uid}
              coluna5="UTC: " resp5={modalData?.UTC}
              coluna6="UnixTime: " resp6={modalData?.unixtime}
              coluna7="Parâmetros: " resp7={modalData?.parametros?.map((itens) => {
                return (
                  <div key={itens.parametro_id}>
                    <ul>
                      <li><b>Nome:</b> {itens?.nome}  <b>Tipo: </b>{itens?.tipo?.nome}  <b>Unidade de medida: </b>{itens?.unidadeDeMedida?.nome}</li>
                    </ul>
                  </div>
                );
              })}
            />
          </tbody>
        </Table>
      </div>
    </>
  )
}