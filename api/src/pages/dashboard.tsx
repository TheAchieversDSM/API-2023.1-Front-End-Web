import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Chart from "../components/chart";
import Sidebar from "../components/sidebar";
import Accordion from "react-bootstrap/Accordion";
import { Row, Col } from 'react-bootstrap';
import { EstacaoParametro, Medida } from "../utils/types/types";
import Options from "../utils/chart_utils/options/options";
import { parseCookies } from "nookies";
import dadosDiarios from "../utils/chart_utils/dadosDiarios";
import { generateOptions } from "../utils/chart_utils/options/optionsGenerate";

export default function Dashboard() {
  const cookies = parseCookies();

  const { id } = useParams();

  const estacaoNome = localStorage.getItem("estacaoNome") || ""
  const [estacaoParametros, setEstacaoParametros] = useState<EstacaoParametro[]>([]);
  const [paramId, setParamId] = useState(0);
  const [renderButton, setRenderButton] = useState(false)
  const [parametroDisplay, setParametroDisplay] = useState<EstacaoParametro>();
  const [medidas, setMedidas] = useState<Medida[]>();
  const [options, setOptions] = useState<Options>();
  const [optionsState, setOptionsState] = useState<any>({});

  useEffect(() => {
    function fetchDataFirstTime() {
      axios
        .get(
          `http://localhost:5000/parametro/pegarMedidaEstacaoParametro/${id}`,
          { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
        )
        .then((res) => {
          setEstacaoParametros(res.data);

        });
    }

    fetchDataFirstTime();

    return () => {
      // Limpar qualquer recurso que precise ser limpo
    };
  }, []);


  useEffect(() => {
    setOptions(generateOptions(estacaoParametros, estacaoNome))
  }, [])

  const setDadosDiarios = (category: any) => {
    const newEstacaoParametros = estacaoParametros.map((estacParam, index) => {
      const updatedEstacParam = { ...estacParam };
      updatedEstacParam.medidas = dadosDiarios(estacParam.medidas, category);
      const opts = generateOptions([updatedEstacParam], estacaoNome ? estacaoNome : '');
      const newOpts = { ...optionsState, [index]: opts };
      setOptionsState(newOpts);
      return updatedEstacParam;
    });

    setEstacaoParametros(newEstacaoParametros);
  };


  useEffect(() => {

    const newOptionsState: any = {};
    estacaoParametros.forEach((param, index) => {
      const opts = generateOptions([param], estacaoNome);
      opts.setFuncao((event: any) => {
        setDadosDiarios(event.point.category)
      });
      newOptionsState[index] = opts;
    });
    setOptionsState(newOptionsState);


  }, [estacaoParametros]);

  useEffect(() => {
    if (paramId != 0) {
      estacaoParametros?.map((estacao) => {
        if (estacao.parametro_id == paramId) {
          setParametroDisplay(estacao);
        }
      });
    }
  }, [paramId]);

  return (
    <>
      <Sidebar />
      <div className="main-body">
        <h1 className="TitImp">{estacaoNome}</h1>
        <div className="container_dashboard">
          <Row>
            <Col xl={100}>
              {estacaoParametros.length > 1 ? (
                estacaoParametros.map((param, index) => (

                  <Chart className="container_dashboard" options={optionsState[index] ? optionsState[index] : {}} />
                ))
              ) : (
                <Chart className="container_dashboard" options={options} />
              )}
            </Col>
          </Row>
          <h4 className="parametrosTitulo">Parâmetros</h4>
          <div className="box-par">
            <Accordion className="accordion">
              {estacaoParametros?.map((param, index) => (
                <Accordion.Item key={index} eventKey={index.toString()} className="accordion-item">
                  <Accordion.Header>{param.nome}</Accordion.Header>
                  <Accordion.Body>{param.formula}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
