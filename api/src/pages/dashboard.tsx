import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/dashboard.css";
import Chart from "../components/chart";
import Sidebar from "../components/sidebar";
import Accordion from "react-bootstrap/Accordion";
import { Row, Col, Button } from 'react-bootstrap';
import { EstacaoParametro, Medida } from "../utils/types/types";
import Options from "../utils/chart_utils/options/options";
import { MdUpdate } from "react-icons/md"
import { parseCookies } from "nookies";
import dadosDiarios from "../utils/chart_utils/dadosDiarios";
import { generateOptions } from "../utils/chart_utils/options/optionsGenerate";
import url from "../services/config";
import obterUnixtimeDia from "../utils/chart_utils/getUnixtimesOfDay";

export default function Dashboard() {
  const cookies = parseCookies();

  const { id } = useParams();

  const estacaoNome = localStorage.getItem("estacaoNome") || "";
  const [estacaoParametros, setEstacaoParametros] = useState<EstacaoParametro[]>([]);
  const [renderButton, setRenderButton] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [options, setOptions] = useState<Options>();
  const [optionsState, setOptionsState] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    function render() {
      console.log(obterUnixtimeDia(new Date()));
      axios
        .get(
          `${url.baseURL}/parametro/pegarMedidaEstacaoParametro/${id}`,
          { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` }, params: { startTime: obterUnixtimeDia().startOf, endTime: obterUnixtimeDia().endOf } }
        )
        .then((res) => {
          console.log(res);
          setEstacaoParametros(res.data);
        });
    }

    if (fetchData) {
      console.log(obterUnixtimeDia(new Date()));
      render();
      setFetchData(false);
      setRenderButton(false);
    }
  }, [fetchData]);

  useEffect(() => {
    setOptions(generateOptions(estacaoParametros, estacaoNome));
  }, []);

  const setDadosDiarios = (category: any) => {
    const newEstacaoParametros = estacaoParametros.map((estacParam, index) => {
      const updatedEstacParam = { ...estacParam };
      updatedEstacParam.medidas = dadosDiarios(estacParam.medidas, category);
      const opts = generateOptions([updatedEstacParam], estacParam.nome);
      const newOpts = { ...optionsState, [index]: opts };
      setOptionsState(newOpts);
      return updatedEstacParam;
    });
    setRenderButton(true);
    setEstacaoParametros(newEstacaoParametros);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const newOptionsState: any = {};
    estacaoParametros.forEach((param, index) => {
      const opts = generateOptions([param], param.nome.bold() || estacaoNome);
      opts.setFuncao((event: any) => {
        setDadosDiarios(event.point.category);
      });
      newOptionsState[index] = opts;
    });
    setOptionsState(newOptionsState);
  }, [estacaoParametros]);

  useEffect(()=>{
    console.log(selectedDate)
    axios
    .get(
      `${url.baseURL}/parametro/pegarMedidaEstacaoParametro/${id}`,
      { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` }, params: { startTime: obterUnixtimeDia(selectedDate).startOf, endTime: obterUnixtimeDia(selectedDate).endOf } }
    )
    .then((res) => {
      console.log(res);
      setEstacaoParametros(res.data);
    });
  }, [selectedDate])


  return (
    <>
      <Sidebar />
      <div className="main-body">
        <h1 className="TitImp">{estacaoNome}</h1>
        <div className="container_dashboard">
          <Calendar onChange={handleDateChange} date={selectedDate} maxDate={new Date()} />
          {renderButton ? <Button className="chartResetButton" onClick={() => setFetchData(true)}><MdUpdate className="buttonIcon" /> Redefinir</Button> : <></>}
          <Row>
            {estacaoParametros.length > 1 ? (
              estacaoParametros.map((param, index) => (
                <Col className="coluna">
                  <Chart className="container_dashboard" options={optionsState[index] ? optionsState[index] : {}} />
                </Col>
              ))
            ) : (
              <Chart className="container_dashboard" options={options} />
            )}
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
