import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "../modal";
import { BsTrash3, BsEye, BsPencil } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { log } from "console";

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

  return (
    <div className="box-list">
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
          {parametros.map((parametro, index) => (
            <tr key={parametro.parametro_id}>
              <td>{parametro.parametro_id}</td>
              <td>{parametro.nome}</td>
              <td>{parametro?.tipo?.nome}</td>
              <td>{parametro.unidadeDeMedida?.nome}</td>
              <td>
                <Button className="bt bt-view">
                  <BsEye
                    className="icon"
                    onClick={() => handleShowModal(parametro)}
                  />
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
        </tbody>
      </Table>
    </div>
  );
}