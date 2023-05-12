import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Chart from "../components/chart";
import Sidebar from "../components/sidebar";
import Accordion from "react-bootstrap/Accordion";

import { EstacaoParametro, MediasSeries, Medida } from "../utils/types/types";
import metricMount from "../utils/chart_utils/metricMount/metricMount";
import Options from "../utils/chart_utils/options/options";
import averageCalculator from "../utils/chart_utils/averageCalculator/averageCalculator";
import chartMount from "../utils/chart_utils/chartMount/chartMount";
import groupByUnixtime from "../utils/chart_utils/groupUnixtime/groupUnixtime";

import { parseCookies } from "nookies";
import dadosDiarios from "../utils/chart_utils/dadosDiarios";
import { generateOptions } from "../utils/chart_utils/options/optionsGenerate";

export default function Dashboard() {
  const cookies = parseCookies();

  const { id } = useParams();

  const estacaoNome = localStorage.getItem("estacaoNome")
  const [estacaoParametros, setEstacaoParametros] = useState<[EstacaoParametro]>();
  const [paramId, setParamId] = useState(0);
  const [parametroDisplay, setParametroDisplay] = useState<EstacaoParametro>();
  const [medidas, setMedidas] = useState<Medida[]>();
  const [options, setOptions] = useState<Options>();
  const [optionsState, setOptionsState] = useState<any>({});
  
  var x = 0

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
    
    while (x <= 2) {
      fetchDataFirstTime()
      x += 1
    }
    const intervalId = setInterval(() => {
      axios
        .get(
          `http://localhost:5000/parametro/pegarMedidaEstacaoParametro/${id}`,
          { headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` } }
        )
        .then((res) => {
          setEstacaoParametros(res.data);
        });
    }, 300000);

    return () => clearInterval(intervalId);

  }, []);

  useEffect(()=>{
    options?.setFuncao((event: any) => {
      if (estacaoParametros && estacaoNome) {
        const estTemp = estacaoParametros
        estacaoParametros[0].medidas =  dadosDiarios(estacaoParametros[0].medidas, event.point.category)
        setEstacaoParametros(estTemp)
    
        setOptions(generateOptions(estacaoParametros, estacaoNome))
      }
    });
  }, [options])

  const setDadosDiarios = (index: any, category: any) =>{
    var estacParam = estacaoParametros
    if(estacParam){
      estacParam[index].medidas = dadosDiarios(estacParam[index].medidas, category) 
      const opts = generateOptions([estacParam[index]], estacaoNome? estacaoNome : '');
      setOptionsState({...optionsState, [index]: opts})
    }
    setEstacaoParametros(estacParam)
  }

  useEffect(() => {
    if (estacaoParametros && estacaoNome) {
      const newOptionsState: any = {};
      estacaoParametros.forEach((param, index) => {
        const opts = generateOptions([param], estacaoNome);
        opts.setFuncao((event: any) => {
            setDadosDiarios(index, event.point.category)       
        });
        newOptionsState[index] = opts;
      });
      setOptionsState(newOptionsState);
    }

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
        <h1 className="TitImp"> {estacaoNome} </h1>
        <div className="container_dashboard">
          <div className="box-dash">
            {estacaoParametros?.map((param, index)=>(
              <Chart className="container_dashboard" options={optionsState[index]} />
            ))}
            
          </div>
          <h4 className="parametrosTitulo">Parâmetros</h4>
          <div className="box-par">
            <Accordion className="accordion">
              {estacaoParametros?.map((param, index) => (
                <Accordion.Item
                  eventKey={index.toString()}
                  className="accordion-item"
                >
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
