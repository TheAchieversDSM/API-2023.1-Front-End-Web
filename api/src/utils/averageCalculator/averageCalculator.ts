import moment from "moment";
import { Medida, MedidasAgrupadas } from "../types/types";

export default function averageCalculator(medidasAgrupadas: MedidasAgrupadas) {
  const medias: Medida[] = [];

  for (const unixtime in medidasAgrupadas) {
    const medidas = medidasAgrupadas[unixtime];
    const soma = medidas.reduce((acc, medida) => acc + Number(medida.valorMedido), 0);
    const resultado = soma / medidas.length;
    const media = {
      valorMedido: resultado.toFixed(1),
      unixtime: Number(unixtime)
    };
    medias.push(media);
  }

  return medias;
}
