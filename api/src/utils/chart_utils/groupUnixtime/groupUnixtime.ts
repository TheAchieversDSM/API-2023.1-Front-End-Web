import { Medida, MedidasAgrupadas } from "../../types/types";

export default function groupByUnixtime(medidas: Medida[]): any {
  const medidasAgrupadas: MedidasAgrupadas = {};
  if (medidas[0].unixtime.split(',').length > 1) {
    medidas.forEach(medida => {
      const dia = medida.unixtime.split('/')[0]
      if (!medidasAgrupadas[dia]) {
        medidasAgrupadas[dia] = [];
      }
      medidasAgrupadas[dia].push(medida);

      const numChaves = Object.keys(medidasAgrupadas).length;
      const exibirHora = numChaves < 2;

      Object.values(medidasAgrupadas).forEach(medidasDoDia => {
        medidasDoDia.forEach((medida: { unixtime: any; }) => {
          const { unixtime } = medida;

          medida.unixtime = unixtime
 
        });
      });
    })
    return medidasAgrupadas
  } else {
    medidas.forEach(medida => {
      const { unixtime } = medida;
      const data = new Date(parseInt(unixtime) * 1000); // converte unixtime para uma data
      const dia = data.toISOString().slice(0, 10); // extrai o dia da data no formato yyyy-mm-dd
      if (!medidasAgrupadas[dia]) {
        medidasAgrupadas[dia] = [];
      }
      medidasAgrupadas[dia].push(medida);

    })
  }


  const numChaves = Object.keys(medidasAgrupadas).length;
  const exibirHora = numChaves < 2;

  Object.values(medidasAgrupadas).forEach(medidasDoDia => {
    medidasDoDia.forEach((medida: { unixtime: any; }) => {
      const { unixtime } = medida;
      const data = new Date(parseInt(unixtime) * 1000); // converte unixtime para uma data
      medida.unixtime = exibirHora ? data.toLocaleString() : data.toLocaleString();
    });
  });

  return medidasAgrupadas;
} 