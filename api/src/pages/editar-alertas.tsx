import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { parseCookies } from "nookies";
// components ✨
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Input from "../components/input";
import SelectMulti from "../components/select";
import Sidebar from "../components/sidebar";
import Button from "../components/button";

import "../styles/criar-alertas.css";

const options = [
  { value: 1, label: "Atenção" },
  { value: 2, label: "Perigo" },
  { value: 3, label: "Crítico" },
];

interface IAlerta {
  nome?: string;
  valorMinimo?: string;
  valorMax?: string;
  nivel?: number;
}

export default function EditarAlertas() {
  const { Select } = Form;
  const cookies = parseCookies();
  const { id } = useParams();

  const nivel = { value: 0, label: "" };

  const [alerta2, setAlerta2] = useState<IAlerta>();

  const [alerta, setAlerta] = useState({
    nome: "",
    valorMin: "",
    valorMax: "",
    nivel: "",
  });

  // inputs' handleChange ✨
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setAlerta((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    console.log(alerta.nivel);
  };

  // select's handleChange ✨
  const handleChangeSelect = (event: any) => {
    if (event.length != 0 && event) {
      setAlerta((prevState) => {
        return {
          ...prevState,
          nivel: event.target.value,
        };
      });
    }
  };

  const handleSubmit = (event: any) => {
    for (
      let index = 0;
      index < event.target.querySelectorAll("input").length;
      index++
    ) {
      event.target.querySelectorAll("input")[index].value = "";
    }

    event.preventDefault();

    if (alerta.nome.length === 0) {
      alerta.nome = alerta2?.nome ?? "";
    }
    if (alerta.valorMin.length === 0) {
      alerta.valorMin = alerta2?.valorMinimo ?? "";
    }
    if (alerta.valorMax.length === 0) {
      alerta.valorMax = alerta2?.valorMax ?? "";
    }
    if (alerta.nivel.length === 0) {
      alerta.nivel = alerta2?.nivel?.toString() ?? "";
    }

    axios
      .put(
        `http://localhost:5000/alerta/atualizarAlertaPorId/${id}`,
        {
          nome: alerta.nome,
          valorMinimo: alerta.valorMin,
          valorMax: alerta.valorMax,
          nivel: parseInt(alerta.nivel),
        },
        { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
      )
      .then((res) => {});

    alert("Alerta atualizado!");
  };

  useEffect(() => {
    async function render() {
      axios
        .get(`http://localhost:5000/alerta/pegarAlertasPorId/${id}`, {
          headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
        })
        .then((res) => {
          setAlerta2(res.data);
        });
    }

    render();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Sidebar />

      <div className="main-body">
        <h1 className="TitImp">Edição de Alertas</h1>

        <div className="box-create">
          <Row className="create-alert-content">
            <Col md={11}>
              <Input
                label="Nome do alerta"
                name="nome"
                size="mb-6"
                type="text"
                placeholder="Insira o nome do alerta."
                onChange={handleChange}
                default={alerta2?.nome}
              />
            </Col>
          </Row>

          <Row className="create-alert-content">
            <Col md={5}>
              <Input
                label="Valor Mínimo"
                name="valorMin"
                size="mb-6"
                type="number"
                placeholder="Insira o valor mínimo do alerta."
                onChange={handleChange}
                default={alerta2?.valorMinimo}
              />
            </Col>

            <Col md={6}>
              <Input
                label="Valor Máximo"
                name="valorMax"
                size="mb-6"
                type="number"
                placeholder="Insira o valor máximo do alerta."
                onChange={handleChange}
                default={alerta2?.valorMax}
              />
            </Col>
          </Row>

          <Row className="create-alert-content">
            <Col md={11}>
              <Form.Label>Nível</Form.Label>
              <Select onChange={handleChangeSelect} value={alerta.nivel}>
                {options.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </Select>
            </Col>
          </Row>

          <div className="create-alert-button">
            <Button
              type="submit"
              label="Criar!"
              className="btnCriar"
              /* onClick={handleSubmit} */
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
