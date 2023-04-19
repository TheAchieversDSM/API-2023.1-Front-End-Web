import { Medida, MedidasAgrupadas } from "../../types/types";

export default function groupByUnixtime(medidas: Medida[]): any {
  const medidasAgrupadas: MedidasAgrupadas = {};

  medidas.forEach(medida => {
    const { unixtime } = medida;
    const data = new Date(parseInt(unixtime) * 1000); // converte unixtime para uma data
    const dia = data.toISOString().slice(0, 10); // extrai o dia da data no formato yyyy-mm-dd
    
    if (!medidasAgrupadas[dia]) {
      console.log(dia)
      medidasAgrupadas[dia] = [];
      console.log(medidasAgrupadas)
    }
    medidasAgrupadas[dia].push(medida);
    
  });
  const numChaves = Object.keys(medidasAgrupadas).length;
  const exibirHora = numChaves < 2;

  Object.values(medidasAgrupadas).forEach(medidasDoDia => {
    medidasDoDia.forEach((medida: { unixtime: any; }) => {
      const { unixtime } = medida;
      const data = new Date(parseInt(unixtime) * 1000); // converte unixtime para uma data
      medida.unixtime = exibirHora ? data.toLocaleTimeString() : data.toLocaleString();
    });
  });

  console.log(medidasAgrupadas);
  return medidasAgrupadas;
} 