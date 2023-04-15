import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsXOctagon, BsEye, BsPencil, BsCheckLg } from 'react-icons/bs'
import {FaChartLine} from 'react-icons/fa'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyVerticallyCenteredModal from '../modal';
import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search';
import { Tab, Tabs } from 'react-bootstrap';
interface IEstacao {
  estacao_parametro: any;
  ativo?: number;
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
  const [inativos, setInativos] = useState<IEstacao[]>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState<IEstacao>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = (estacao: IEstacao) => {
    setModalData(estacao);
    setModalShow(true);
  };

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/estacao/pegarEstacoesAtivas").then((res)=>{
                setEstacoes(res.data)
            })
        }

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/estacao/pegarEstacoesInativas").then((res)=>{
                setInativos(res.data)
            })
        }
        render()
    },[])

    function handleChange(estacoes : IEstacao) {
      const id = estacoes.estacao_id;
      const ativo = estacoes.ativo === 1 ? 0 : 1;
      axios.put(`http://localhost:5000/estacao/atualizarEstado/${id}`, { ativo })
        .then((response) => {
          // fazer algo com a resposta, se necessário
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          // tratar o erro, se necessário
          console.error(error);
        });
    }

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
                <Link to={`/dashboard/${estacao.estacao_id}`}><Button className="bt bt-record"><FaChartLine  className="icon"/></Button></Link>
                <Button className="bt bt-view" onClick={() => handleShowModal(estacao)}><BsEye className="icon" /></Button>
                <Link to={`/editar-estacao/${estacao.estacao_id}`}>
                  <Button className="bt bt-edit">
                    <BsPencil className="icon" />
                  </Button>
                </Link>
                <Button className="bt bt-delete"><BsXOctagon className="icon" onClick={() => handleChange(estacao)}/></Button>
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
              inativo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              inativo.estacao_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
    
            return false;
          })
          .map((inativo) => (
            <tr>
            <td>{inativo.estacao_id}</td>
            <td>{inativo.nome}</td>
            <td>{inativo.lati}</td>
            <td>{inativo.long}</td>
            <td>
                <Link to={`/dashboard/${inativo.estacao_id}`}><Button className="bt bt-record"><FaChartLine  className="icon"/></Button></Link>
                <Button className="bt bt-view" onClick={() => handleShowModal(inativo)}><BsEye className="icon" /></Button>
                <Link to={`/editar-estacao/${estacao.estacao_id}`}>
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
    <Search change={handleSearch} link="/criar-estacoes" />
    <div className="box-list">
          <Tabs>
            <Tab eventKey="ativo" title="Ativos">
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
            </Tab>
            <Tab eventKey="inativo" title="Inativos">
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
                      {renderTableRowsInativos()}
                  </tbody>
              </Table>
            </Tab>
          </Tabs>
      </div>
    </>
  )
}