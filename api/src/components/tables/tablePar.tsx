import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "../modal";
import { BsTrash3, BsEye, BsPencil } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../search";
import { Tab, Tabs } from "react-bootstrap";

interface IParametro {
  parametro_id: number;
  nome?: string;
  tipo?: {
    tipo_id: number;
    nome: string;
  };
  unidadeDeMedida?: {
    nome: string;
    unidade_id: number;
  };
  fator?: string;
  offset?: string;
}

export default function TablePar(props: any) {
  const [parametros, setParametros] = useState<IParametro[]>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState<IParametro>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = (parametro: any) => {
    setModalData(parametro);
    setModalShow(true);
  };

  useEffect(() => {
    function render() {
      axios
        .get("http://localhost:5000/parametro/pegarParametros")
        .then((res) => {
          setParametros(res.data);
        });
    }
    render();
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function renderTableRows() {
    return parametros
      .filter((parametro) => {
        if (!searchTerm) {
          return true;
        }

        if (
          parametro?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parametro?.tipo?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parametro.parametro_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }

        return false;
      })
      .map((parametro) => (
        <tr key={parametro.parametro_id}>
              <td>{parametro.parametro_id}</td>
              <td>{parametro.nome}</td>
              <td>{parametro?.tipo?.nome}</td>
              <td>{parametro.unidadeDeMedida?.nome}</td>
              <td>
                <Button className="bt bt-view" onClick={() => handleShowModal(parametro)}>
                  <BsEye
                    className="icon"
                  />
                </Button>
                <Button className="bt bt-edit">
                  <BsPencil className="icon" />
                </Button>
                <Button className="bt bt-delete">
                  <BsTrash3 className="icon" />
                </Button>
                <MyVerticallyCenteredModal
            show={modalShow}
            {...modalData}
            onHide={() => setModalShow(false)}
            titulo={modalData?.nome}
            coluna1="ID: "
            resp1={modalData?.parametro_id}
            coluna3="Tipo: "
            resp3={modalData?.tipo?.nome}
            coluna4="Unidade de medida: "
            resp4={modalData?.unidadeDeMedida?.nome}
            coluna5="Fator: "
            resp5={modalData?.fator}
            coluna6="OffSet: "
            resp6={modalData?.offset}
          />
              </td>
            </tr>
            
      ));
  }

  return (
    <>
    <Search change={handleSearch} link="/criar-parametros"/>
    <div className="box-list">
      <Tabs>
        <Tab eventKey="ativo" title="Ativos">
          <Table className="table" size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Unidade de medida</th>
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
                <th>Tipo</th>
                <th>Unidade de medida</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
    </>
  );
}