import { EstacaoParametro, MediasSeries } from "../../types/types";
import averageCalculator from "../averageCalculator/averageCalculator";
import chartMount from "../chartMount/chartMount";
import groupByUnixtime from "../groupUnixtime/groupUnixtime";
import metricMount from "../metricMount/metricMount";
import Options from "./options";

export const generateOptions = (estacaoParametros: EstacaoParametro[], estacaoNome?: string): Options => {
  const medidasseries: MediasSeries[] = [];
  estacaoParametros?.map((parametro: EstacaoParametro) => {
    if (parametro.medidas[0].unixtime) {
      parametro.medidaMedia = averageCalculator(
        groupByUnixtime(parametro.medidas)
      );
      console.log(parametro?.nome)
      const med = {
        nome: parametro?.nome,
        sufixo: {
          nome: " " + parametro.unidadeDeMedida.nome,
          id: parametro.unidadeDeMedida.unidade_id,
        },
        media: parametro.medidaMedia,
      };
      medidasseries.push(med);
    }
  });

  const medidas = medidasseries;


  const metrics = metricMount(medidas);
  const newOptions = chartMount(metrics, estacaoNome ? estacaoNome : "");
  console.log(newOptions)
  return newOptions;

};