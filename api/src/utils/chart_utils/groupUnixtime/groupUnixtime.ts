import { Medida, MedidasAgrupadas } from "../../types/types";

export default function groupByUnixtime(medidas: Medida[]): MedidasAgrupadas {
  const medidasAgrupadas: MedidasAgrupadas = {};

  medidas.forEach(medida => {
    const { unixtime } = medida;
    const data = new Date(unixtime * 1000); // converte unixtime para uma data
    const dia = data.toISOString().slice(0, 10); // extrai o dia da data no formato yyyy-mm-dd
    if (!medidasAgrupadas[parseInt(dia)]) {
      medidasAgrupadas[parseInt(dia)] = [];
    }
    medidasAgrupadas[parseInt(dia)].push(medida);
  });

  return medidasAgrupadas;
} 