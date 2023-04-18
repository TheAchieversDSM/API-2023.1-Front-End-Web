import moment from "moment";
import { Medida, MedidasAgrupadas } from "../../types/types";

export default function averageCalculator(medidasAgrupadas: MedidasAgrupadas) {
  const medias: Medida[] = [];

  if (Object.keys(medidasAgrupadas).length > 1) {
    for (const unixtime in medidasAgrupadas) {
      const medidas = medidasAgrupadas[unixtime];
      const soma = medidas.reduce(
        (acc, medida) => acc + Number(medida.valorMedido),
        0
      );
      const resultado = soma / medidas.length;
      const media = {
        valorMedido: resultado.toFixed(1),
        unixtime: unixtime,
      };
      medias.push(media);
    }
  }else{
    for (const unixtime in medidasAgrupadas) {
      medidasAgrupadas[unixtime].map(med=>{
        const medida = {valorMedido: med.valorMedido, unixtime:med.unixtime}
        medias.push(medida)
        
      })
    }
  }
  return medias;
}