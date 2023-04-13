import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "../modal";
import { BsTrash3, BsEye, BsPencil, BsCheckLg, BsXOctagon } from "react-icons/bs";
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
  ativo?: number;
}

interface IEstados{
  parametro_id: any;
  ativo?: number;
}

export default function TablePar(props: any) {
  const [parametros, setParametros] = useState<IParametro[]>([]);
  const [inativos, setInativos] = useState<IParametro[]>([]);
  const [estados, setEstados] = useState<IEstados[]>([]);
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
        .get("http://localhost:5000/parametro/pegarParametrosAtivos")
        .then((res) => {
          setParametros(res.data);
        });
    }
    render();
  }, []);

  useEffect(() => {
    function render() {
      axios
        .get("http://localhost:5000/parametro/pegarParametrosInativos")
        .then((res) => {
          setInativos(res.data);
        });
    }
    render();
  }, []);

  function handleChange(parametros : IParametro) {
    const id = parametros.parametro_id;
    const ativo = parametros.ativo === 1 ? 0 : 1;
    axios.put(`http://localhost:5000/parametro/atualizarEstado/${id}`, { ativo })
      .then((response) => {
        // fazer algo com a resposta, se necessário
        console.log(response.data);
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
                <Button className="bt bt-delete" onClick={() => handleChange(parametro)}>
                  <BsXOctagon className="icon" />
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

  function renderTableRowsInativos() {
    return inativos
      .filter((inativo) => {
        if (!searchTerm) {
          return true;
        }

        if (
          inativo?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inativo?.tipo?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inativo.parametro_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }

        return false;
      })
      .map((inativo) => (
        <tr key={inativo.parametro_id}>
              <td>{inativo.parametro_id}</td>
              <td>{inativo.nome}</td>
              <td>{inativo?.tipo?.nome}</td>
              <td>{inativo.unidadeDeMedida?.nome}</td>
              <td>
                <Button className="bt bt-view" onClick={() => handleShowModal(inativo)}>
                  <BsEye
                    className="icon"
                  />
                </Button>
                <Button className="bt bt-edit">
                  <BsPencil className="icon" />
                </Button>
                <Button className="bt bt-active" onClick={() => handleChange(inativo)}>
                  <BsCheckLg className="icon" />
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
              {renderTableRowsInativos()}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
    </>
  );
}