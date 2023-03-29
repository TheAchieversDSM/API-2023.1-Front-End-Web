import { MediasSeries, Data } from "../../types/types";
import Metric from "../metric/metric";

export default function metricMount(data: Array<MediasSeries>){
    var metrics: Metric[] = []
    var series: [number,number]
    data.map(metric => {
        var newMetric = new Metric("",[0,0]);
        newMetric.setTooltip(metric.sufixo)
        newMetric.setName(metric.nome)
        series.push(metric.media.valor)
        series.push(metric.media.timestamp)
        newMetric.setData(series)
        metrics.push(newMetric) 
      });
      
    return metrics;
}