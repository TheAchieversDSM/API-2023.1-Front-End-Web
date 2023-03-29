import moment from "moment";
import { Medida } from "../types/types";

export default function averageCalculator(medidas: Medida[]) {
    console.log(medidas)
    const soma = medidas.reduce((acc, medida) => acc + Number(medida.valorMedido), 0);
    var media = { valor: soma / medidas.length, timestamp: moment(medidas[0].unixtime).startOf('day').unix() }
    return media
}