import { Medida, MedidasAgrupadas } from "../types/types";

export default function groupByUnixtime(medidas: Medida[]): MedidasAgrupadas {
  const medidasAgrupadas: MedidasAgrupadas = {};

  medidas.forEach(medida => {
    const { unixtime } = medida;
    if (!medidasAgrupadas[unixtime]) {
      medidasAgrupadas[unixtime] = [];
    }
    medidasAgrupadas[unixtime].push(medida);
  });

  return medidasAgrupadas;
}