import Metric from "../metric/metric";

export default function metricMount(data: Array<any>){
    var metrics: Metric[] = []
    data.map( metric => {
        var newMetric = new Metric("",[], metric.medidas_valorMedido);
        newMetric.setName(metric.ps_nome)
        newMetric.setData(metric.data)
        metrics.push(newMetric) 
      });
      
    return metrics;
}