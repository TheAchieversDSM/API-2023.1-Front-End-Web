import { MediasSeries, Data } from "../../types/types";
import Metric from "../metric/metric";

export default function metricMount(data: Array<MediasSeries>){
    const metrics: Metric[] = []
    data.map(metric => {
        const series: number[][] = []
        const newMetric = new Metric("",[[0,0]]);
        newMetric.setTooltip(metric.sufixo.nome)
        newMetric.setName(metric.nome)
        metric.media.map(metrica =>{
          const datas: number[] = [];
          datas.push(metrica.unixtime)
          datas.push(Number(metrica.valorMedido))
          series.push(datas)
        })
        newMetric.setData(series)
        metrics.push(newMetric) 
      });
    return metrics;
}