import { EstacaoParametro, MediasSeries } from "../../types/types";
import averageCalculator from "../averageCalculator/averageCalculator";
import chartMount from "../chartMount/chartMount";
import groupByUnixtime from "../groupUnixtime/groupUnixtime";
import metricMount from "../metricMount/metricMount";

export const generateOptions = (estacaoParametros: EstacaoParametro[], estacaoNome?: string) => {
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
  
    const medidas = medidasseries;
  
    if (medidas) {
      const metrics = metricMount(medidas);
      const newOptions = chartMount(metrics, estacaoNome ? estacaoNome : "");
      return newOptions;
    }
  };