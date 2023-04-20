import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Chart from "../components/chart";
import Sidebar from "../components/sidebar";
import Accordion from "react-bootstrap/Accordion";

import { EstacaoParametro, MediasSeries } from "../utils/types/types";
import metricMount from "../utils/chart_utils/metricMount/metricMount";
import Options from "../utils/chart_utils/options/options";
import averageCalculator from "../utils/chart_utils/averageCalculator/averageCalculator";
import chartMount from "../utils/chart_utils/chartMount/chartMount";
import groupByUnixtime from "../utils/chart_utils/groupUnixtime/groupUnixtime";

export default function Dashboard() {
  const { id } = useParams();
  const estacaoNome = localStorage.getItem("estacaoNome")
  const [estacaoParametros, setEstacaoParametros] = useState<[EstacaoParametro]>();
  const [paramId, setParamId] = useState(0);
  const [parametroDisplay, setParametroDisplay] = useState<EstacaoParametro>();
  const [medidas, setMedidas] = useState<Array<MediasSeries>>();
  const [options, setOptions] = useState<Options>();
  useEffect(() => {
    function render() {
      axios
        .get(
          `http://localhost:5000/parametro/pegarMedidaEstacaoParametro/${id}`
        )
        .then((res) => {
          setEstacaoParametros(res.data);
        });
    }

    render();
  }, []);


  useEffect(() => {
    const medidasseries: MediasSeries[] = [];
    estacaoParametros?.map((parametro: EstacaoParametro) => {
      if (parametro.medidas[0].unixtime) {
        parametro.medidaMedia = averageCalculator(
          groupByUnixtime(parametro.medidas)
        );
        const med = {
          nome: parametro.nome,
          sufixo: {
            nome: " " + parametro.unidadeDeMedida.nome,
            id: parametro.unidadeDeMedida.unidade_id,
          },
          media: parametro.medidaMedia,
        };
        medidasseries.push(med);
      }
    });
    setMedidas(medidasseries);
    if (medidas) {
      const metrics = metricMount(medidas);
      console.log(metrics)
      setOptions(chartMount(metrics));
    }
  }, [estacaoParametros]);

  useEffect(() => {
    if (paramId != 0) {
      estacaoParametros?.map((estacao) => {
        if (estacao.parametro_id == paramId) {
          setParametroDisplay(estacao);
          console.log(parametroDisplay);
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
            <Chart className="container_dashboard" options={options} />
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
