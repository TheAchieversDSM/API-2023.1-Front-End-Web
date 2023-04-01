import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsGraphUp, BsClipboard2 } from 'react-icons/bs'
import {FaChartLine} from 'react-icons/fa'
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
        function render(){
            axios.get("http://localhost:5000/estacao/pegarEstacoes").then((res)=>{
                console.log(res.data)
                setEstacoes(res.data)
            })
        }
        render()
    },[])

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
            <td>{estacao?.estacao_parametro}</td>
            <td>
                <Link to={`/dashboard/${estacao.estacao_id}`}><Button className="bt bt-record"><FaChartLine  className="icon"/></Button></Link>
                <Button className="bt bt-view" onClick={() => handleShowModal(estacao)}><BsEye className="icon" /></Button>
                <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                <MyVerticallyCenteredModal
                show={modalShow}
                {...modalData}
                onHide={() => setModalShow(false)}
                titulo={estacao.nome}
                coluna1="ID: " resp1={estacao.estacao_id}
                coluna2="Latitude: " resp2={estacao.lati}
                coluna3="Longitude: " resp3={estacao.long}
                coluna4="UID: " resp4={estacao.uid}
                coluna5="UTC: " resp5={estacao.UTC}
                coluna6="UnixTime: " resp6={estacao.unixtime}
                coluna7="Parâmetros: " resp7={modalData?.parametros?.map((itens) => {
                  return (
                    <div key={itens.parametro_id}>
                      <p>{itens?.nome}</p>
                      <p>{itens?.tipo?.nome}</p>
                      <p>{itens?.unidadeDeMedida?.nome}</p>
                    </div>
                  );
                })}
            />
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
                      <th>Parametros</th>
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