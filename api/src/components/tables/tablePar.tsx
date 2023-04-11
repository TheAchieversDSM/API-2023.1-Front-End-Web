import Table from "react-bootstrap/Table";
import "../../styles/table.css";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "../modals/modal";
import { BsTrash3, BsEye, BsPencil } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../search";
import ModalForm2 from "../modals/modalForm2";

interface IParametro {
  parametro_id: number;
  nome?: string;
  formula?: string;
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
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalData2, setModalData2] = React.useState<IParametro>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = (parametro: any) => {
    setModalData(parametro);
    setModalShow(true);
  };

  const handleShowModal2 = (parametro: any) => {
    setModalData2(parametro);
    setModalShow2(true);
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
            <Button className="bt bt-edit" onClick={() => handleShowModal2(parametro)}>
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
      <Search change={handleSearch} link="/criar-parametros" />
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
            {renderTableRows()}
          </tbody>
        </Table>

        <ModalForm2
          show={modalShow2}
          {...modalData}
          onHide={() => setModalShow2(false)}
          titulo={"Editar Parâmetro: " + modalData?.nome}
          campo1={"Nome"}
          tipo1={"text"}
          value1={modalData?.nome}
          function1={''}
          placeholder1={"Digite o novo nome do parâmetro"}
          campo2={"Fórmula/Explicação"}
          tipo2={"textarea"}
          value2={modalData?.formula}
          function2={''}
          height={"100px"}
          placeholder2={"Digite a nova fórmula/explicação do parâmetro"}
          campo3={"Tipo de Parâmetro"}
          value3={modalData?.tipo?.nome}
          name3={"tipo"}
          placeholder3={"Selecione o novo tipo do parâmetro"}
          function3={''}
          options3={''}
          campo4={"Unidade de Medida"}
          value4={modalData?.unidadeDeMedida?.nome}
          name4={"unidade"}
          placeholder4={"Selecione a nova unidade de medida do parâmetro"}
          function4={''}
          options4={''}
          campo5={"Fator"}
          tipo5={"text"}
          value5={modalData?.fator}
          function5={''}
          placeholder5={"Digite o novo fator do parâmetro"}
          campo6={"OffSet"}
          tipo6={"text"}
          value6={modalData?.offset}
          function6={''}
          placeholder6={"Digite o novo offSet do parâmetro"}
          function={() => setModalShow2(false)}
        />
      </div>
    </>
  );
}