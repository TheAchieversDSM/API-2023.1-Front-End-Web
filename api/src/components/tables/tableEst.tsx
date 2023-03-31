import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import {
  BsTrash3,
  BsEye,
  BsPencil,
  BsGraphUp,
  BsClipboard2,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import MyVerticallyCenteredModal from "../modal";
import React from "react";
import { Link } from "react-router-dom";

interface IEstacao {
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

  const handleShowModal = (estacao: IEstacao) => {
    setModalData(estacao);
    setModalShow(true);
  };

  useEffect(() => {
    function render() {
      axios.get("http://localhost:5000/estacao/pegarEstacoes").then((res) => {
        setEstacoes(res.data);
      });
    }
    render();
  }, []);

  return (
    <div className="box-list">
      <Table className="table" size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>UnixTime</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {estacoes.map((estacao) => (
            <tr key={estacao.estacao_id}>
              <td>{estacao.estacao_id}</td>
              <td>{estacao.nome}</td>
              <td>{estacao.lati}</td>
              <td>{estacao.long}</td>
              <td>{estacao.unixtime}</td>
              <td>
                <Button className="bt bt-record">
                  <BsClipboard2 className="icon" />
                </Button>
                <Button className="bt bt-view">
                  <BsEye className="icon" onClick={() => handleShowModal(estacao)} />
                </Button>
                <Button className="bt bt-edit">
                  <BsPencil className="icon" />
                </Button>
                <Button className="bt bt-delete">
                  <BsTrash3 className="icon" />
                </Button>
              </td>
            </tr>
          ))}
          <MyVerticallyCenteredModal
            show={modalShow}
            {...modalData}
            onHide={() => setModalShow(false)}
            titulo={modalData?.nome}
            coluna1="ID: "
            resp1={modalData?.estacao_id}
            coluna2="Latitude: "
            resp2={modalData?.lati}
            coluna3="Longitude: "
            resp3={modalData?.long}
            coluna4="UID: "
            resp4={modalData?.uid}
            coluna5="UTC: "
            resp5={modalData?.UTC}
            coluna6="Parâmetros: "
            resp6={modalData?.parametros?.map((itens) => {
              return (
                <div key={itens.parametro_id}>
                  <p>{itens.nome}</p>
                  <p>{itens?.tipo?.nome}</p>
                  <p>{itens?.unidadeDeMedida?.nome}</p>
                </div>
              );
            })}
          />
        </tbody>
      </Table>
    </div>
  );
}